@echo off
title O'quv Markaz Sayti
color 0A

echo.
echo ========================================
echo    O'QUV MARKAZ SAYTI - 100% TAYYOR!
echo ========================================
echo.

echo [1/3] Fayl mavjudligini tekshirish...
if not exist "index.html" (
    echo XATOLIK: index.html fayli topilmadi!
    echo Loyiha papkasida index.html fayli bo'lishi kerak.
    pause
    exit /b 1
)
echo ✓ index.html fayli topildi

echo.
echo [2/3] Brauzer mavjudligini tekshirish...
where chrome >nul 2>nul
if %errorlevel% equ 0 (
    set BROWSER=chrome
    echo ✓ Google Chrome topildi
) else (
    where firefox >nul 2>nul
    if %errorlevel% equ 0 (
        set BROWSER=firefox
        echo ✓ Mozilla Firefox topildi
    ) else (
        where msedge >nul 2>nul
        if %errorlevel% equ 0 (
            set BROWSER=msedge
            echo ✓ Microsoft Edge topildi
        ) else (
            set BROWSER=start
            echo ! Brauzer topilmadi, default brauzer ishlatiladi
        )
    )
)

echo.
echo [3/3] Saytni ochish...
echo ✓ O'quv Markaz sayti ochilmoqda...
echo.

if "%BROWSER%"=="chrome" (
    start chrome "index.html"
) else if "%BROWSER%"=="firefox" (
    start firefox "index.html"
) else if "%BROWSER%"=="msedge" (
    start msedge "index.html"
) else (
    start "" "index.html"
)

echo ========================================
echo    SAYT MUVAFFAQIYATLI OCHILDI!
echo ========================================
echo.
echo 📱 Sayt xususiyatlari:
echo    ✅ Responsive dizayn
echo    ✅ 6 ta professional kurs
echo    ✅ 4 ta tajribali o'qituvchi
echo    ✅ Xabar yuborish formasi
echo    ✅ Zamonaviy animatsiyalar
echo.
echo 📞 Aloqa:
echo    Telefon: +998 90 123 45 67
echo    Email: info@oquvmarkaz.uz
echo.
echo 🎯 Kurslar:
echo    • Web Dasturlash - 2,500,000 so'm
echo    • Python Dasturlash - 2,200,000 so'm
echo    • Grafik Dizayn - 1,800,000 so'm
echo    • Digital Marketing - 2,000,000 so'm
echo    • Ingliz Tili - 1,500,000 so'm
echo    • Biznes Boshqaruvi - 2,300,000 so'm
echo.
echo 💡 Maslahat: Agar sayt ochilmasa, index.html faylini
echo    brauzerda qo'lda oching (Ctrl + O)
echo.
echo ========================================
echo.
pause