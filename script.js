const apiKey = 'YOUR_API_KEY';  // قم بوضع مفتاح API حقيقي هنا

// دالة لتحميل العملات
async function loadCurrencies() {
    const url = 'https://api.exchangerate-api.com/v4/latest/USD';  // API للحصول على بيانات العملات
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.rates) {
            const currencies = Object.keys(data.rates);
            const fromCurrencySelect = document.getElementById('from-currency');
            const toCurrencySelect = document.getElementById('to-currency');

            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                const optionTo = document.createElement('option');
                optionFrom.value = currency;
                optionTo.value = currency;
                optionFrom.textContent = getCurrencyName(currency);
                optionTo.textContent = getCurrencyName(currency);

                fromCurrencySelect.appendChild(optionFrom);
                toCurrencySelect.appendChild(optionTo);
            });
        }
    } catch (error) {
        alert('خطأ في تحميل العملات');
    }
}

// دالة لتحويل العملات
async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (!amount || isNaN(amount) || amount <= 0) {
        alert('من فضلك أدخل مبلغ صحيح');
        return;
    }

    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.rates) {
            const rate = data.rates[toCurrency];
            if (rate) {
                const convertedAmount = (amount * rate).toFixed(2);
                document.getElementById('converted-amount').innerText = 
                    `النتيجة: ${convertedAmount} ${getCurrencyName(toCurrency)}`;
            } else {
                alert('خطأ: لم يتم العثور على سعر الصرف لهذه العملة.');
            }
        } else {
            alert('خطأ في الاتصال بالـ API.');
        }
    } catch (error) {
        alert('حدث خطأ أثناء الاتصال بالـ API.');
    }
}

// دالة لتحويل رمز العملة إلى اسمها باللغة العربية
function getCurrencyName(currency) {
    const currencyNames = {
        "USD": "دولار أمريكي",
        "EUR": "يورو",
        "GBP": "جنيه استرليني",
        "JPY": "ين ياباني",
        "AUD": "دولار أسترالي",
        "CAD": "دولار كندي",
        "CHF": "فرنك سويسري",
        "INR": "روبية هندية",
        "SAR": "ريال سعودي",
        "EGP": "جنيه مصري",
        "AED": "درهم إماراتي",
        "CNY": "يوان صيني",
        "BRL": "ريال برازيلي",
        "MXN": "بيزو مكسيكي",
        "ZAR": "راند جنوب أفريقي",
        "RUB": "روبل روسي",
        "TRY": "ليرة تركية",
        "KRW": "وون كوري",
        "HKD": "دولار هونغ كونغ",
        "SEK": "كرونة سويدية",
        "NOK": "كرونة نرويجية",
        "DKK": "كرونة دنماركية",
        "SGD": "دولار سنغافوري",
        "MYR": "رينغيت ماليزي",
        "IDR": "روبية إندونيسية",
        "THB": "بات تايلندي",
        "PHP": "بيزو فلبيني",
        "CLP": "بيزو تشيلي",
        "PLN": "زلوطي بولندي",
        "HUF": "فورنت مجري",
        "CZK": "كورونا تشيكية",
        "COP": "بيزو كولومبي",
        "TWD": "دولار تايواني",
        "ILS": "شيكل إسرائيلي",
        "LKR": "روبية سريلانكية",
        "VND": "دونغ فيتنامي",
        "KES": "شلينغ كينيائي",
        "BHD": "دينار بحريني",
        "KWD": "دينار كويتي",
        "OMR": "ريال عماني",
        "QAR": "ريال قطري",
        "JOD": "دينار أردني",
        "LKR": "روبية سريلانكية",
        "PKR": "روبية باكستانية",
        "BND": "دولار بروناي",
        "NGN": "نايرا نيجيرية"
    };

    return currencyNames[currency] || currency;
}

// دالة لعرض سعر الصرف لليوم
async function showExchangeRateToday() {
    const url = 'https://api.exchangerate-api.com/v4/latest/USD';  // API للحصول على سعر الصرف
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.rates) {
            const usdToEgpRate = data.rates['EGP'];
            document.getElementById('today-rate').innerText = `1 دولار أمريكي = ${usdToEgpRate.toFixed(2)} جنيه مصري`;
            document.querySelector('.exchange-rate-today').style.display = 'block';
        }
    } catch (error) {
        console.error('حدث خطأ أثناء جلب سعر الصرف لليوم:', error);
    }
}

// استدعاء دالة تحميل العملات عند تحميل الصفحة
window.onload = function() {
    loadCurrencies();
    showExchangeRateToday();
};