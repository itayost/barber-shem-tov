// src/app/accessibility/page.tsx
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'הצהרת נגישות | The Fader - Barbershop & Academy',
  description: 'הצהרת הנגישות של The Fader - אקדמיה לספרות ומספרה בטירת הכרמל',
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-black text-lightgrey">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto" dir="rtl">
          <h1 className="text-h1 font-bold text-gold mb-8 text-center">הצהרת נגישות</h1>
          
          <div className="prose prose-lg max-w-none text-lightgrey space-y-6">
            <section className="mb-8">
              <p className="text-lg mb-6">
                ב-The Fader - Barbershop & Academy אנו מחויבים להנגשת השירותים שלנו לכלל האוכלוסייה, כולל אנשים עם מוגבלות. 
                אנו פועלים כדי להבטיח שכל אדם יוכל ליהנות משירותינו באופן שווה, מכובד ועצמאי.
              </p>
              <p className="text-sm text-lightgrey opacity-75">
                תאריך עדכון אחרון: ינואר 2025
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">נגישות פיזית במספרה ובאקדמיה</h2>
              <div className="space-y-4">
                <h3 className="text-h4 font-semibold text-lightgrey">הסדרי נגישות במקום:</h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>כניסה נגישה ללא מדרגות</li>
                  <li>דלתות רחבות המאפשרות מעבר כיסא גלגלים</li>
                  <li>שירותים נגישים</li>
                  <li>חניית נכים בקרבת המקום</li>
                  <li>שילוט ברור וקריא</li>
                  <li>תאורה מתאימה בכל חללי המקום</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">נגישות השירות</h2>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>צוות מיומן ומוכשר לסייע ללקוחות עם צרכים מיוחדים</li>
                <li>אפשרות לתיאום מראש של סיוע מיוחד</li>
                <li>גמישות בזמני השירות בהתאם לצורך</li>
                <li>אפשרות להגעה עם מלווה</li>
                <li>התאמות אישיות בהתאם לצרכי הלקוח</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">נגישות האתר</h2>
              <p className="mb-4">
                אתר האינטרנט שלנו עומד בתקן הישראלי ת"י 5568 ברמת AA, ואנו פועלים באופן מתמיד לשיפור הנגישות הדיגיטלית:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>תאימות לקוראי מסך</li>
                <li>ניווט באמצעות מקלדת בלבד</li>
                <li>טקסטים ברורים וקריאים</li>
                <li>ניגודיות צבעים מתאימה</li>
                <li>אפשרות להגדלת גופן</li>
                <li>תיאורי alt לתמונות</li>
                <li>מבנה כותרות היררכי</li>
                <li>טפסים נגישים עם תוויות ברורות</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">התאמות נגישות בקורסים</h2>
              <p className="mb-4">
                אנו מספקים התאמות מיוחדות לתלמידים עם צרכים מיוחדים:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>חומרי לימוד בפורמטים נגישים</li>
                <li>הארכת זמן במבחנים ומטלות בהתאם לצורך</li>
                <li>אפשרות להקלטת שיעורים</li>
                <li>ליווי אישי והתאמות פרטניות</li>
                <li>כיתות לימוד נגישות</li>
                <li>ציוד מותאם במידת הצורך</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">טכנולוגיות מסייעות</h2>
              <p className="mb-4">האתר שלנו תואם לשימוש עם:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>קוראי מסך כגון NVDA, JAWS</li>
                <li>תוכנות הגדלה</li>
                <li>תוכנות זיהוי קולי</li>
                <li>מקלדות חלופיות</li>
                <li>עכברים מותאמים</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">דרכי הגעה נגישות</h2>
              <div className="bg-charcoal p-6 rounded-lg mb-4">
                <p className="mb-3"><strong className="text-gold">תחבורה ציבורית:</strong></p>
                <ul className="list-disc list-inside space-y-2 mr-4 mb-4">
                  <li>תחנות אוטובוס נגישות בסמיכות למקום</li>
                  <li>מרחק הליכה קצר מהתחנה המרכזית</li>
                  <li>מדרכות נגישות בדרך למקום</li>
                </ul>
                <p className="mb-3"><strong className="text-gold">הגעה ברכב פרטי:</strong></p>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>חניית נכים ייעודית</li>
                  <li>אפשרות להורדה והעלאה ליד הכניסה</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">הדרכת הצוות</h2>
              <p>
                כל אנשי הצוות שלנו עוברים הדרכות תקופתיות בנושא נגישות ושירות לאנשים עם מוגבלות, כולל:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4 mt-4">
                <li>יחס מכבד ושוויוני</li>
                <li>תקשורת נגישה</li>
                <li>סיוע והכוונה</li>
                <li>שימוש בעזרים ומתקנים נגישים</li>
                <li>מודעות לצרכים שונים</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">בקשות להתאמות מיוחדות</h2>
              <p className="mb-4">
                אנו מעודדים לקוחות עם צרכים מיוחדים ליצור איתנו קשר מראש לתיאום התאמות נוספות. 
                נשמח לסייע ולהתאים את השירות לצרכים האישיים שלכם.
              </p>
              <div className="bg-charcoal p-6 rounded-lg">
                <p className="mb-3">
                  לתיאום התאמות מיוחדות או לקבלת מידע נוסף, ניתן לפנות אלינו:
                </p>
                <ul className="space-y-2">
                  <li><strong className="text-gold">טלפון:</strong> <a href="tel:052-8691415" className="hover:text-gold transition-colors">052-8691415</a></li>
                  <li><strong className="text-gold">WhatsApp:</strong> <a href="https://wa.me/972528691415" className="hover:text-gold transition-colors">052-8691415</a></li>
                  <li><strong className="text-gold">דוא"ל:</strong> <a href="mailto:academythefader@gmail.com" className="hover:text-gold transition-colors">academythefader@gmail.com</a></li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">משוב ושיפור מתמיד</h2>
              <p className="mb-4">
                אנו מחויבים לשיפור מתמיד של הנגישות במקום ובאתר. נשמח לקבל משוב, הצעות ודיווחים על בעיות נגישות.
              </p>
              <p>
                המשוב שלכם חשוב לנו ויסייע לנו להמשיך ולשפר את השירות עבור כל לקוחותינו.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">רכז נגישות</h2>
              <div className="bg-charcoal p-6 rounded-lg">
                <p className="mb-3">
                  רכז הנגישות של The Fader אחראי על יישום ושיפור הנגישות במקום:
                </p>
                <p className="mb-2"><strong className="text-gold">שם:</strong> בר שם טוב</p>
                <p className="mb-2"><strong className="text-gold">תפקיד:</strong> מנהל האקדמיה ורכז נגישות</p>
                <p className="mb-2"><strong className="text-gold">טלפון:</strong> <a href="tel:052-8691415" className="hover:text-gold transition-colors">052-8691415</a></p>
                <p className="mb-2"><strong className="text-gold">דוא"ל:</strong> <a href="mailto:academythefader@gmail.com" className="hover:text-gold transition-colors">academythefader@gmail.com</a></p>
                <p className="mt-4 text-sm">
                  הרכז עבר הכשרה בנושא נגישות השירות ונגישות סביבה בנויה.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">הליך הגשת תלונה</h2>
              <p className="mb-4">
                במידה ונתקלתם בבעיית נגישות או לא קיבלתם מענה הולם, באפשרותכם להגיש תלונה בדרכים הבאות:
              </p>
              <ol className="list-decimal list-inside space-y-2 mr-4">
                <li>פנייה ישירה לרכז הנגישות בפרטי הקשר המצוינים למעלה</li>
                <li>פנייה בכתב לכתובת: העצמאות 4, טירת הכרמל</li>
                <li>פנייה לנציבות שוויון זכויות לאנשים עם מוגבלות</li>
              </ol>
              <p className="mt-4">
                אנו מתחייבים לטפל בכל פנייה תוך 7 ימי עסקים ולספק מענה מקיף.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-h3 font-semibold text-gold mb-4">מידע משפטי</h2>
              <p className="mb-4">
                הצהרת נגישות זו נערכה בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998 ותקנותיו.
              </p>
              <p>
                האתר עומד בדרישות תקן ישראלי 5568 לנגישות תכנים באינטרנט ברמת AA ובהנחיות WCAG 2.1.
              </p>
            </section>

            <section className="text-center mt-12 pt-8 border-t border-lightgrey border-opacity-20">
              <p className="text-lg font-semibold text-gold mb-4">
                "נגישות היא לא רק חובה - היא ערך וזכות בסיסית"
              </p>
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