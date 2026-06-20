<?php
$to = 'ingenion71@yandex.com';
$subject = 'Тест mail() с сервера';
$body = 'Если ты видишь это письмо, значит mail() работает.';
$headers = "From: no-reply@ingenion.ru\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo "ok";
} else {
    echo "fail";
}
