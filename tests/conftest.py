import pytest
from backend.main import app, limiter

@pytest.fixture(autouse=True)
def reset_rate_limiter():
    limiter.reset()
    yield
