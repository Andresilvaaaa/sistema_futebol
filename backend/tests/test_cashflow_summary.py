import pytest
from datetime import date

from backend import create_app
from backend.services.db.connection import db
from backend.services.db.models import MonthlyPeriod, Expense


@pytest.fixture(scope="function")
def app():
    app = create_app("testing")
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()


@pytest.fixture(scope="function")
def client(app):
    return app.test_client()


def _register_user_and_get_token(client):
    payload = {"username": "cf_tester", "email": "cf_tester@example.com", "password": "secret123"}
    resp = client.post("/api/auth/register", json=payload)
    assert resp.status_code in (200, 201)
    data = resp.get_json()
    token = data["access_token"]
    user_id = data["user"]["id"]
    return token, user_id


def _seed_cashflow_data(app, user_id: str):
    with app.app_context():
        p1 = MonthlyPeriod(
            user_id=user_id,
            month=1,
            year=2024,
            name="Jan 2024",
            total_expected=250.0,
            total_received=200.0,
        )
        p2 = MonthlyPeriod(
            user_id=user_id,
            month=2,
            year=2024,
            name="Fev 2024",
            total_expected=350.0,
            total_received=300.0,
        )

        db.session.add_all([p1, p2])
        db.session.commit()

        e1 = Expense(
            monthly_period_id=p1.id,
            user_id=user_id,
            description="Campo",
            amount=50.0,
            category="Campo",
            date=date(2024, 1, 3),
            month=1,
            year=2024,
        )
        e2 = Expense(
            monthly_period_id=p2.id,
            user_id=user_id,
            description="Material",
            amount=70.0,
            category="Material",
            date=date(2024, 2, 5),
            month=2,
            year=2024,
        )

        db.session.add_all([e1, e2])
        db.session.commit()


def test_cashflow_summary_minimal(app, client):
    # arrange
    token, user_id = _register_user_and_get_token(client)
    _seed_cashflow_data(app, user_id)

    headers = {"Authorization": f"Bearer {token}"}

    # act
    r = client.get("/api/cashflow/summary", headers=headers)

    # assert status
    assert r.status_code == 200

    # assert observability headers
    assert "X-Request-Duration-ms" in r.headers
    assert "X-Trace-Id" in r.headers

    # assert payload
    data = r.get_json()
    assert isinstance(data, list)
    assert len(data) == 2

    jan = next((x for x in data if x["period"]["year"] == 2024 and x["period"]["month"] == 1), None)
    feb = next((x for x in data if x["period"]["year"] == 2024 and x["period"]["month"] == 2), None)

    assert jan is not None and feb is not None

    assert jan["monthly"]["received"] == 200.0
    assert jan["expenses"]["total"] == 50.0
    assert jan["summary"]["net"] == 150.0

    assert feb["monthly"]["received"] == 300.0
    assert feb["expenses"]["total"] == 70.0
    assert feb["summary"]["net"] == 230.0