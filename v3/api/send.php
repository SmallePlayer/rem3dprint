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
