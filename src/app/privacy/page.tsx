// src/app/privacy/page.tsx
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות | The Fader - Barbershop & Academy',
  description: 'מדיניות הפרטיות של The Fader - אקדמיה לספרות ומספרה בטירת הכרמל',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-lightgrey">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto" dir="rtl">
          <h1 className="text-h1 font-bold text-gold mb-8 text-center">מדיניות פרטיות</h1>
          
          <div className="prose prose-lg max-w-none text-lightgrey space-y-6">
            <section className="mb-8">
              <p className="text-lg mb-6">
                ב-The Fader - Barbershop & Academy (להלן: "האקדמיה" או "אנחנו") אנו מכבדים את פרטיותך ומחויבים להגן על המידע האישי שלך. מסמך זה מפרט את האופן שבו אנו אוספים, משתמשים ומגנים על המידע שלך.
              </p>
              <p className="text-sm text-lightgrey opacity-75">
                תאריך עדכון אחרון: ינואר 2025
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">1. איסוף מידע</h2>
              <p className="mb-4">אנו אוספים מידע שאתה מספק לנו ישירות, כולל:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>פרטים אישיים: שם, טלפון, כתובת דוא"ל</li>
                <li>מידע לצורך הרשמה לקורסים: תאריכי לידה, כתובת מגורים</li>
                <li>מידע פיננסי: פרטי תשלום (מעובדים באמצעות צד שלישי מאובטח)</li>
                <li>תכנים שאתה יוצר: תמונות מעבודות, חוות דעת, הערות</li>
                <li>מידע טכני: כתובת IP, סוג דפדפן, זמני גישה</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">2. שימוש במידע</h2>
              <p className="mb-4">אנו משתמשים במידע שנאסף למטרות הבאות:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>ניהול ההרשמה והשתתפות בקורסים</li>
                <li>תיאום פגישות ומתן שירותי ספרות</li>
                <li>משלוח עדכונים על קורסים חדשים ומבצעים (באישורך)</li>
                <li>שיפור השירותים והחוויה באתר</li>
                <li>מענה לפניות ומתן תמיכה</li>
                <li>עמידה בדרישות החוק</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">3. שיתוף מידע עם צדדים שלישיים</h2>
              <p className="mb-4">אנו לא מוכרים או משכירים את המידע האישי שלך. נשתף מידע רק במקרים הבאים:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>עם ספקי שירות הפועלים בשמנו (כגון מעבדי תשלומים)</li>
                <li>כאשר נדרש על פי חוק או צו בית משפט</li>
                <li>להגנה על זכויותינו ובטיחות המשתמשים</li>
                <li>בהסכמתך המפורשת</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">4. אבטחת מידע</h2>
              <p className="mb-4">
                אנו נוקטים באמצעי אבטחה טכניים וארגוניים כדי להגן על המידע שלך מפני גישה לא מורשית, שימוש לרעה, או אובדן. האמצעים כוללים:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>הצפנת נתונים רגישים</li>
                <li>הגבלת גישה למידע לעובדים מורשים בלבד</li>
                <li>עדכונים שוטפים של מערכות האבטחה</li>
                <li>גיבויים קבועים של המידע</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">5. עוגיות (Cookies)</h2>
              <p className="mb-4">
                האתר שלנו משתמש בעוגיות כדי לשפר את חוויית הגלישה שלך. עוגיות הן קבצי טקסט קטנים המאוחסנים במחשב שלך. אנו משתמשים בהן ל:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>זכירת העדפות המשתמש</li>
                <li>ניתוח תעבורה באתר</li>
                <li>שיפור הפונקציונליות של האתר</li>
              </ul>
              <p className="mt-4">
                באפשרותך לנהל או לחסום עוגיות דרך הגדרות הדפדפן שלך.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">6. זכויותיך</h2>
              <p className="mb-4">על פי חוק הגנת הפרטיות, יש לך זכות ל:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>עיון במידע האישי שלך המוחזק אצלנו</li>
                <li>תיקון מידע שגוי או לא מעודכן</li>
                <li>מחיקת מידע אישי (בכפוף לחובות שמירת מידע על פי חוק)</li>
                <li>התנגדות לשימוש במידע שלך לצרכי שיווק ישיר</li>
                <li>קבלת העתק של המידע שלך בפורמט נגיש</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">7. ילדים ונוער</h2>
              <p>
                שירותינו מיועדים לאנשים מעל גיל 16. אנו לא אוספים ביודעין מידע מילדים מתחת לגיל זה ללא הסכמת הורה או אפוטרופוס.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">8. שמירת מידע</h2>
              <p>
                אנו שומרים את המידע האישי שלך כל עוד הוא נחוץ למטרות שלשמן נאסף, או כנדרש על פי חוק. מידע שאינו נחוץ יותר יימחק או יהפוך לאנונימי.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">9. קישורים לאתרים חיצוניים</h2>
              <p>
                האתר שלנו עשוי להכיל קישורים לאתרים של צדדים שלישיים. איננו אחראים למדיניות הפרטיות או לתוכן של אתרים אלה.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">10. שינויים במדיניות הפרטיות</h2>
              <p>
                אנו שומרים לעצמנו את הזכות לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באתר עם ציון תאריך העדכון.
              </p>
            </section>

            <section className="mb-8 border-t border-lightgrey border-opacity-20 pt-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">11. יצירת קשר</h2>
              <p className="mb-4">
                לשאלות או בקשות בנוגע למדיניות הפרטיות, ניתן לפנות אלינו בדרכים הבאות:
              </p>
              <div className="bg-charcoal p-6 rounded-lg">
                <p className="mb-2"><strong className="text-gold">כתובת:</strong> העצמאות 4, טירת הכרמל</p>
                <p className="mb-2"><strong className="text-gold">טלפון:</strong> <a href="tel:052-8691415" className="hover:text-gold transition-colors">052-8691415</a></p>
                <p className="mb-2"><strong className="text-gold">דוא"ל:</strong> <a href="mailto:academythefader@gmail.com" className="hover:text-gold transition-colors">academythefader@gmail.com</a></p>
              </div>
            </section>

            <section className="text-center mt-12 pt-8 border-t border-lightgrey border-opacity-20">
              <p className="text-sm text-lightgrey opacity-75">
                © 2025 The Fader - Barbershop & Academy. כל הזכויות שמורות.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}