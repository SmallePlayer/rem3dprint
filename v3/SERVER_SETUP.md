# Настройка отправки почты на сервере

## Сервер
- IP: 161.104.32.75
- Пароль root: Rk4q4h7ph0cu
- Сайт: /var/www/html/

## Что установлено
- msmtp 1.8.24 — лёгкий SMTP-клиент
- sendmail символическая ссылка → /usr/bin/msmtp

## Конфиг /etc/msmtprc
```
defaults
auth           on
tls            on
tls_trust_file /etc/ssl/certs/ca-certificates.crt

account        yandex
host           smtp.yandex.com
port           587
from           ingenion71@yandex.com
user           ingenion71@yandex.com
password       ibrtwhqmrbomcxcf

account default : yandex
```

## send.php (путь: /var/www/html/api/send.php)
```php
<?php
header('Content-Type: application/json');

$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$service = trim($_POST['service'] ?? 'Не указана');
$message = trim($_POST['message'] ?? 'Без сообщения');

if (!$name || !$phone) {
    http_response_code(400);
    echo json_encode(['error' => 'Заполните имя и телефон']);
    exit;
}

$to = 'ingenion71@yandex.com';
$subject = 'Новая заявка с сайта';
$body = "Имя: $name\nТелефон: $phone\nУслуга: $service\nСообщение: $message";
$headers = "From: ingenion71@yandex.com\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка отправки']);
}
```

## Если перестанет работать
1. Проверить msmtp:
   ```bash
   echo "Subject: test" | msmtp --debug --account=yandex ingenion71@yandex.com
   ```
2. Проверить PHP:
   ```bash
   php -r "var_dump(mail('ingenion71@yandex.com', 'Test', 'Body', 'From: ingenion71@yandex.com'));"
   ```
3. Проверить логи:
   ```bash
   tail -30 /var/log/mail.log 2>/dev/null || tail -30 /var/log/maillog 2>/dev/null
   ```
