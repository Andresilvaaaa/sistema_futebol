import sys
sys.path.append('.')

from app import create_app
from services.db.models import Player

app = create_app()
app.app_context().push()

print('Colunas da tabela players:')
for col in Player.__table__.columns:
    print(f'{col.name}: {col.type}, nullable={col.nullable}')