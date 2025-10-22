@echo off
echo ========================================
echo    O'quv Markaz Sayti O'rnatish
echo ========================================
echo.

echo 1. Node.js versiyasini tekshirish...
node --version
if %errorlevel% neq 0 (
    echo XATOLIK: Node.js o'rnatilmagan!
    echo Iltimos, https://nodejs.org/ dan Node.js o'rnating
    pause
    exit /b 1
)

echo.
echo 2. MongoDB versiyasini tekshirish...
mongod --version
if %errorlevel% neq 0 (
    echo OGOHLANTIRISH: MongoDB o'rnatilmagan!
    echo Iltimos, https://www.mongodb.com/try/download/community dan MongoDB o'rnating
    echo.
    echo MongoDB o'rnatgandan so'ng, uni ishga tushiring:
    echo mongod
    echo.
)

echo.
echo 3. Backend dependencies o'rnatilmoqda...
call npm install
if %errorlevel% neq 0 (
    echo XATOLIK: Backend dependencies o'rnatishda muammo!
    pause
    exit /b 1
)

echo.
echo 4. Frontend dependencies o'rnatilmoqda...
cd client
call npm install
if %errorlevel% neq 0 (
    echo XATOLIK: Frontend dependencies o'rnatishda muammo!
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo    O'rnatish Muvaffaqiyatli Yakunlandi!
echo ========================================
echo.
echo Keyingi qadamlar:
echo 1. MongoDB ni ishga tushiring: mongod
echo 2. Loyihani ishga tushiring: start.bat faylini ishga tushiring
echo 3. Brauzerda http://localhost:3000 ni oching
echo.
echo Yordam uchun README.md faylini o'qing
echo.
pause
