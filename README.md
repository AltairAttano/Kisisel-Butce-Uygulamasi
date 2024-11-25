### **Kişisel Bütçe ve Harcama Takip Uygulaması - Teknik Döküman**

Bu döküman, kişisel bütçe uygulamasının nasıl çalıştığını, kullanılan teknolojileri ve temel yapı taşlarını açıklamaktadır.

---

## **Genel Amaç**
Uygulama, kullanıcıların gelir ve giderlerini takip etmelerini, bütçe limitleri belirlemelerini, raporlamalar yapmalarını ve tasarruf önerileri alabilmelerini sağlar. Modern web geliştirme araçları ile oluşturulan bu uygulama **responsive** bir tasarıma sahiptir ve kullanıcı deneyimini öncelikli kılar.

---

## **Kullanılan Teknolojiler**

### **1. Next.js**
- **Rolü:** React tabanlı framework; uygulama sayfalarını, bileşen yönetimini ve server-side rendering (SSR) gibi özellikleri sağlar.
- **Neden Kullanıldı?**
  - Performans optimizasyonu.
  - Kolay sayfa yönlendirme.
  - React projelerinde hızlı geliştirme altyapısı.

---

### **2. Tailwind CSS**
- **Rolü:** Responsive ve modern tasarım için bir CSS framework’ü.
- **Kullanım Örnekleri:**
  - **Responsive Grid Sistemi:** `grid-cols-1`, `md:grid-cols-2`, `lg:grid-cols-3` gibi sınıflar ile cihaz boyutlarına uyumlu düzenlemeler.
  - **Dark Mode Desteği:** Tailwind'in `dark` sınıfı ile kullanıcıların karanlık temayı etkinleştirmesi sağlandı.
  - **Hızlı Stil Uygulaması:** Her bileşenin görünümü için minimal kod yazımı.

---

### **3. Context API**
- **Rolü:** Uygulama genelinde veri paylaşımı için durum yönetimi (state management).
- **Kullanım Alanları:**
  - **Bütçe Yönetimi (`BudgetContext.js`):**
    - Gelir ve gider verilerinin eklenmesi.
    - Bütçe limitlerinin belirlenmesi.
  - **Tema Yönetimi (`ThemeContext.js`):**
    - Light ve dark mode geçişlerini kontrol eder.
    - Kullanıcının tercihine göre sayfa görünümünü değiştirir.
- **Alternatif:** Redux yerine daha basit ve hızlı bir çözüm olan Context API tercih edilmiştir.

---

### **4. Chart.js**
- **Rolü:** Gelir-gider verilerinin görselleştirilmesi için grafik kütüphanesi.
- **Kullanım Örnekleri:**
  - **Bar Grafik:** Aylık gelir-gider karşılaştırması.
  - **Pasta Grafik:** Harcamaların kategori bazında gösterimi.
- **Reacts Chart.js 2** ile entegrasyon yapılarak React projelerine uygun hale getirildi.

---

### **5. jsPDF ve html2canvas**
- **Rolü:** Uygulamadaki raporların PDF olarak indirilebilmesi.
- **Nasıl Çalışır?**
  - **html2canvas:** HTML içeriği bir resme dönüştürülür.
  - **jsPDF:** Oluşturulan resim PDF formatında kullanıcının cihazına indirilir.
- **Kullanım Alanı:**
  - Gelir-gider raporları ve harcamalara ait görseller.

---

### **6. Local Storage**
- **Rolü:** Kullanıcının verilerini tarayıcı üzerinde saklama.
- **Neden Kullanıldı?**
  - Kullanıcı verilerinin sunucuya ihtiyaç olmadan saklanabilmesi.
  - Verilerin sayfa yenilendiğinde kaybolmaması.
- **Kullanım Örnekleri:**
  - Gelir ve gider kayıtlarının saklanması.
  - Bütçe limitlerinin korunması.

---

### **7. date-fns**
- **Rolü:** Tarih işlemleri için bir kütüphane.
- **Kullanım Alanları:**
  - İşlemlerin tarih formatında saklanması (`yyyy-MM-dd`).
  - Gelir-gider verilerinin ay ve yıl bazında gruplanması.

---

## **Uygulamanın Özellikleri**

### **1. Gelir ve Gider Ekleme**
- Kullanıcı, gelir ve gider kalemlerini ekleyebilir.
- Her kalem için tür (gelir/gider), kategori, tutar, açıklama ve tarih girilebilir.
- **Teknoloji:** Form verileri `BudgetContext` aracılığıyla saklanır ve `localStorage`'da depolanır.

### **2. Bütçe Limitleri ve Uyarılar**
- Kullanıcı, her kategori için bir bütçe limiti belirleyebilir.
- Harcamalar limitin %80’ine ulaştığında uyarı verilir.
- Limit aşıldığında kullanıcı bilgilendirilir.
- **Teknoloji:** `BudgetContext` bütçe limitlerini ve harcamaları takip eder.

### **3. Raporlama ve Analiz**
- **Aylık Gelir-Gider Karşılaştırması:**
  - Çubuk grafik ile aylık gelir ve giderlerin dağılımı gösterilir.
- **Kategori Bazında Harcamalar:**
  - Pasta grafik ile kategorilere göre harcama oranları görselleştirilir.
- **Teknoloji:** Chart.js, gelir-gider verilerinin dinamik olarak görselleştirilmesini sağlar.

### **4. Tasarruf Önerileri**
- Kullanıcının bütçe ve harcamalarına dayalı öneriler sunar.
- **Örnek:** "Gıda kategorisindeki harcamalarınız bütçenizi aşıyor, harcamalarınızı kontrol ederek tasarruf sağlayabilirsiniz."
- **Teknoloji:** Kategoriler ve toplam harcamalar, yardımcı bir fonksiyon ile analiz edilir.

### **5. PDF İndirme**
- Kullanıcı, gelir-gider raporlarını PDF formatında indirebilir.
- **Teknoloji:** `jspdf` ve `html2canvas` kullanılarak grafiklerin ve verilerin PDF’ye dönüştürülmesi sağlanır.

### **6. Responsive Tasarım**
- Tüm cihaz boyutlarında uyumlu bir arayüz.
- **Mobil:** Formlar ve raporlar tek sütun halinde.
- **Tablet:** Formlar iki sütun halinde gösterilir.
- **Masaüstü:** Tüm bileşenler üç sütun halinde düzenlenir.
- **Teknoloji:** Tailwind CSS grid ve responsive sınıfları.

### **7. Dark Mode**
- Kullanıcı, aydınlık ve karanlık temalar arasında geçiş yapabilir.
- **Teknoloji:** Tailwind CSS `dark` sınıfı ve `ThemeContext`.

---

## **Projenin Genel Akışı**

1. **Başlatma:** Next.js projeyi başlatır ve `BudgetContext` ile veri yönetimi sağlanır.
2. **Kullanıcı Etkileşimi:**
   - Gelir ve gider formları doldurulur, veriler kaydedilir.
   - Grafikler ve öneriler, dinamik olarak güncellenir.
3. **Raporlama:**
   - Grafikler ve kategori detayları görüntülenir.
   - PDF olarak raporlar indirilir.
4. **Tema:** Kullanıcı tercihlerine göre dark/light mode geçişleri yapılır.

---

## **Sonuç**
Bu uygulama, modern web geliştirme teknolojileri ile tasarlanmış kullanıcı dostu bir kişisel bütçe takip aracıdır. Kullanıcının tüm ihtiyaçlarını karşılayan, performanslı ve esnek bir çözüm sunar. 😊
