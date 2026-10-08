import logging
import smtplib
import threading
from email.message import EmailMessage

from flask import current_app

log = logging.getLogger(__name__)


def notify_new_message(message):
    """SMTP ayarlıysa yeni mesajı e-postayla bildirir. İsteği bekletmemek için
    arka planda gönderilir; gönderim hatası mesajın kaydedilmesini engellemez."""
    cfg = current_app.config
    if not (cfg["SMTP_HOST"] and cfg["NOTIFY_EMAIL"]):
        return

    mail = EmailMessage()
    mail["Subject"] = f"[PEGESYS] Yeni proje talebi: {message.project_type} — {message.name}"
    mail["From"] = cfg["SMTP_USER"] or cfg["NOTIFY_EMAIL"]
    mail["To"] = cfg["NOTIFY_EMAIL"]
    mail["Reply-To"] = message.email
    mail.set_content(
        f"Ad: {message.name}\nE-posta: {message.email}\nProje türü: {message.project_type}\n\n{message.body}\n"
    )
    settings = {k: cfg[k] for k in ("SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD")}

    def send():
        try:
            with smtplib.SMTP(settings["SMTP_HOST"], settings["SMTP_PORT"], timeout=15) as smtp:
                smtp.starttls()
                if settings["SMTP_USER"]:
                    smtp.login(settings["SMTP_USER"], settings["SMTP_PASSWORD"])
                smtp.send_message(mail)
        except Exception:
            log.exception("Bildirim e-postası gönderilemedi")

    threading.Thread(target=send, daemon=True).start()
