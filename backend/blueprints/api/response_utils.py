"""
Utilitários para padronização de respostas da API
"""
from flask import jsonify
from typing import Any, Dict, List, Optional, Union
from datetime import datetime
import decimal
from marshmallow import ValidationError as MarshValidationError


class APIResponse:
    """Classe para padronizar respostas da API"""
    
    @staticmethod
    def success(data: Any = None, message: str = None, status_code: int = 200) -> tuple:
        """
        Resposta de sucesso padronizada
        
        Args:
            data: Dados a serem retornados
            message: Mensagem de sucesso opcional
            status_code: Código de status HTTP
            
        Returns:
            Tuple com (response, status_code)
        """
        response = {
            'success': True,
            'data': APIResponse._serialize_data(data) if data is not None else None,
            'message': message,
            'timestamp': datetime.utcnow().isoformat()
        }
        
        # Remove campos None para resposta mais limpa
        response = {k: v for k, v in response.items() if v is not None}
        
        return jsonify(response), status_code
    
    @staticmethod
    def error(message: str, errors: Dict[str, List[str]] = None, status_code: int = 400) -> tuple:
        """
        Resposta de erro padronizada
        
        Args:
            message: Mensagem de erro principal
            errors: Dicionário com erros específicos por campo
            status_code: Código de status HTTP
            
        Returns:
            Tuple com (response, status_code)
        """
        response = {
            'success': False,
            'message': message,
            'errors': errors,
            'timestamp': datetime.utcnow().isoformat()
        }
        
        # Remove campos None
        response = {k: v for k, v in response.items() if v is not None}
        
        return jsonify(response), status_code
    
    @staticmethod
    def paginated(data: List[Any], pagination: Dict[str, Any], message: str = None) -> tuple:
        """
        Resposta paginada padronizada
        
        Args:
            data: Lista de dados
            pagination: Informações de paginação
            message: Mensagem opcional
            
        Returns:
            Tuple com (response, status_code)
        """
        response = {
            'success': True,
            'data': APIResponse._serialize_data(data),
            'pagination': pagination,
            'message': message,
            'timestamp': datetime.utcnow().isoformat()
        }
        
        # Remove campos None
        response = {k: v for k, v in response.items() if v is not None}
        
        return jsonify(response), 200
    
    @staticmethod
    def _serialize_data(data: Any) -> Any:
        """
        Serializa dados para JSON, tratando tipos especiais
        
        Args:
            data: Dados a serem serializados
            
        Returns:
            Dados serializados
        """
        if isinstance(data, list):
            return [APIResponse._serialize_data(item) for item in data]
        
        if isinstance(data, dict):
            return {key: APIResponse._serialize_data(value) for key, value in data.items()}
        
        if isinstance(data, decimal.Decimal):
            return float(data)
        
        if isinstance(data, datetime):
            return data.isoformat()
        
        # Para objetos SQLAlchemy, usar o método to_dict se disponível
        if hasattr(data, 'to_dict'):
            return APIResponse._serialize_data(data.to_dict())
        
        return data


class ValidationError(Exception):
    """Exceção para erros de validação"""
    
    def __init__(self, message: str, errors: Dict[str, List[str]] = None):
        self.message = message
        self.errors = errors or {}
        super().__init__(self.message)


def handle_api_error(func):
    """
    Decorator para tratamento padronizado de erros em endpoints
    """
    from functools import wraps
    
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except MarshValidationError as e:
            # Erros de validação do Marshmallow devem retornar 400 com detalhes
            errors = getattr(e, 'messages', None)
            return APIResponse.error('Dados inválidos', errors, 400)
        except ValidationError as e:
            return APIResponse.error(e.message, e.errors, 400)
        except ValueError as e:
            return APIResponse.error(f"Erro de validação: {str(e)}", status_code=400)
        except Exception as e:
            # Log do erro real para debugging
            import logging
            logging.error(f"Erro não tratado em {func.__name__}: {str(e)}")
            return APIResponse.error("Erro interno do servidor", status_code=500)
    
    return wrapper