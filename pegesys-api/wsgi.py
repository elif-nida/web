import os
from pathlib import Path

# Yerelde .env dosyasını yükle (canlıda değişkenler platformdan gelir)
env_file = Path(__file__).with_name(".env")
if env_file.exists():
    for line in env_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip())

from app import create_app  # noqa: E402

app = create_app()

if __name__ == "__main__":
    app.run(port=int(os.environ.get("PORT", 5000)), debug=True)
