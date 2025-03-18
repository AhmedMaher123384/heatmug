import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  ThermometerSun, 
  Battery, 
  Coffee, 
  Star, 
  ArrowRight, 
  User, 
  Phone, 
  MapPin,
  ChevronDown, 
  ChevronUp, 
  Package, 
  RefreshCw, 
  HelpCircle, 
  Truck, 
  Gift, 
  Shield,
  Check,
  Trash2
} from 'lucide-react';

// Dynamic image imports
const productImages = {
  hero: () => import('../asserts/0.jpg').then(module => module.default),
  img1: () => import('../asserts/1.jpg').then(module => module.default),
  img2: () => import('../asserts/2.jpg').then(module => module.default),
  img3: () => import('../asserts/3.jpg').then(module => module.default),
  img4: () => import('../asserts/4.jpg').then(module => module.default),
  img5: () => import('../asserts/5.jpg').then(module => module.default),
  img6: () => import('../asserts/6.jpg').then(module => module.default),
  logo: () => import('../asserts/logo.png').then(module => module.default),
};

// مكون FeatureCard
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div 
    className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="mb-4 text-green-600 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold text-green-900 text-center">{title}</h3>
    <p className="text-gray-600 text-center mt-2">{description}</p>
  </motion.div>
);

// مكون HeroImage
const HeroImage: React.FC = () => {
  const [heroImageSrc, setHeroImageSrc] = useState<string>('');

  useEffect(() => {
    productImages.hero().then(src => setHeroImageSrc(src)).catch(err => {
      console.error("Error loading hero image:", err);
    });
  }, []);

  return (
    <motion.div 
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      {heroImageSrc ? (
        <img
          src={heroImageSrc}
          alt="مسخن القهوة الكهربائي"
          className="w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">جاري التحميل...</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </motion.div>
  );
};

// مكون Header
interface HeaderProps {
  logoSrc: string | null;
}

const Header: React.FC<HeaderProps> = ({ logoSrc }) => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md py-3"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="w-32 sm:w-40">
            {logoSrc ? (
              <motion.img
                src={logoSrc}
                alt="HeatMug Logo"
                className="w-full h-auto object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            ) : (
              <div className="w-full h-10 bg-gray-200 animate-pulse rounded"></div>
            )}
          </div>
          <motion.nav 
            className="hidden md:flex gap-4 justify-center flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {['الرئيسية', 'المميزات', 'الباقات', 'الطلب', 'الآراء', 'الأسئلة', 'الإرجاع'].map((item, index) => (
              <a 
                key={index}
                href={`#${item === 'الرئيسية' ? '' : item === 'المميزات' ? 'features' : item === 'الباقات' ? 'bundles' : item === 'الطلب' ? 'order-form' : item === 'الآراء' ? 'testimonials' : item === 'الأسئلة' ? 'faq' : 'return-policy'}`}
                className="font-medium text-green-900 hover:text-pink-600 transition-colors text-sm"
              >
                {item}
              </a>
            ))}
          </motion.nav>
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-lg font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            اطلب الآن
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

// مكون الأسئلة الشائعة
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "كيف يعمل مسخن القهوة الكهربائي؟",
      answer: "يعمل مسخن القهوة الكهربائي عن طريق لوحة تسخين مدمجة تحافظ على درجة حرارة مشروبك بشكل مثالي. يمكنك ضبط درجة الحرارة المناسبة (بين 40-65 درجة مئوية) بحسب تفضيلاتك الشخصية. يعمل بنظام آمن مع خاصية الإيقاف التلقائي بعد ساعتين من الاستخدام المتواصل."
    },
    {
      question: "ما هي مدة الضمان؟",
      answer: "نقدم ضمانًا شاملًا لمدة شهر واحد ضد عيوب التصنيع."
    },
    {
      question: "ما هي المدة المتوقعة للشحن؟",
      answer: "يتم شحن الطلبات خلال 24 ساعة من تأكيد الطلب. تصل المنتجات عادةً خلال 3-5 أيام عمل للمدن الرئيسية و5-7 أيام للمناطق النائية."
    },
    {
      question: "هل المنتج آمن للاستخدام؟",
      answer: "نعم، مصمم بأعلى معايير السلامة مع خاصية الإيقاف التلقائي وحماية من السخونة الزائدة."
    },
    {
      question: "كيف يمكنني تنظيف المسخن؟",
      answer: "استخدم قطعة قماش مبللة لمسح السطح بعد فصله عن الكهرباء وتركه ليبرد."
    },
    {
      question: "ما هي المدة التي يستمر فيها المشروب دافئًا؟",
      answer: "يحافظ على الحرارة لمدة تصل إلى 8 ساعات متواصلة."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900 mb-4">الأسئلة الشائعة</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">كل ما تحتاج معرفته عن مسخن القهوة الكهربائي</p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <div 
                className={`bg-white rounded-xl shadow-md overflow-hidden border ${openIndex === index ? 'border-green-500' : 'border-gray-200'}`}
              >
                <button
                  className="w-full py-4 px-4 sm:px-6 text-right flex items-center justify-between focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className={`text-lg sm:text-xl font-semibold ${openIndex === index ? 'text-green-900' : 'text-gray-800'}`}>
                    {item.question}
                  </h3>
                  <div className={`${openIndex === index ? 'text-green-900' : 'text-gray-500'}`}>
                    {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 sm:px-6 pb-5 text-right"
                  >
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{item.answer}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// مكون سياسة الإرجاع والاستبدال
const ReturnPolicySection = () => {
  return (
    <section id="return-policy" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900 mb-4 tracking-tight">
            سياسة الإرجاع والاستبدال
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            نحن نضمن رضاك التام عن منتجنا بسياسات مرنة وشفافة
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-pink-600 mb-3">سياسة الإرجاع</h3>
              <div className="bg-pink-100 p-3 rounded-full shadow-md">
                <RefreshCw size={28} className="text-pink-600" />
              </div>
            </div>
            <ul className="space-y-3 text-gray-700 text-right">
              <li className="flex items-center justify-end gap-3">
                <Check size={18} className="text-pink-600 flex-shrink-0" />
                <span>يمكنك إرجاع المنتج خلال 14 يوم من تاريخ الاستلام</span>
              </li>
              <li className="flex items-center justify-end gap-3">
                <Check size={18} className="text-pink-600 flex-shrink-0" />
                <span>يجب أن يكون المنتج بحالته الأصلية وفي عبوته الأصلية</span>
              </li>
              <li className="flex items-center justify-end gap-3">
                <Check size={18} className="text-pink-600 flex-shrink-0" />
                <span>استرداد كامل للمبلغ خلال 7 أيام من استلام المنتج المرتجع</span>
              </li>
              <li className="flex items-center justify-end gap-3">
                <Check size={18} className="text-pink-600 flex-shrink-0" />
                <span>رسوم الشحن للإرجاع مجانية في حالة وجود عيب مصنعي</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-3">سياسة الاستبدال</h3>
              <div className="bg-green-100 p-3 rounded-full shadow-md">
                <Shield size={28} className="text-green-600" />
              </div>
            </div>
            <ul className="space-y-3 text-gray-700 text-right">
              <li className="flex items-center justify-end gap-3">
                <Check size={18} className="text-green-600 flex-shrink-0" />
                <span>استبدال مجاني خلال 30 يومًا في حالة وجود عيب مصنعي</span>
              </li>
              <li className="flex items-center justify-end gap-3">
                <Check size={18} className="text-green-600 flex-shrink-0" />
                <span>يمكن تغيير اللون أو الموديل خلال 14 يومًا من الاستلام</span>
              </li>
              <li className="flex items-center justify-end gap-3">
                <Check size={18} className="text-green-600 flex-shrink-0" />
                <span>شحن الاستبدال مجاني في جميع أنحاء المملكة</span>
              </li>
              <li className="flex items-center justify-end gap-3">
                <Check size={18} className="text-green-600 flex-shrink-0" />
                <span>ضمان شامل لمدة شهر واحد ضد عيوب التصنيع</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-12 bg-gradient-to-br from-white to-green-50 p-6 rounded-2xl border border-green-200 max-w-4xl mx-auto shadow-lg"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-6 text-center">كيفية طلب الإرجاع أو الاستبدال</h3>
          <ol className="space-y-4 text-right">
            <li className="flex items-start justify-end gap-3">
              <span className="bg-pink-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-bold text-pink-600">١</span>
              <p className="text-gray-700">
                تواصل معنا عبر رقم خدمة العملاء{" "}
                <span className="font-bold text-green-900">920001234</span> أو عبر البريد الإلكتروني{" "}
                <span className="font-bold text-green-900">support@heatmug.com</span>
              </p>
            </li>
            <li className="flex items-start justify-end gap-3">
              <span className="bg-pink-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-bold text-pink-600">٢</span>
              <p className="text-gray-700">سيقوم فريق خدمة العملاء بتزويدك برقم طلب الإرجاع وتفاصيل الشحن</p>
            </li>
            <li className="flex items-start justify-end gap-3">
              <span className="bg-pink-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-bold text-pink-600">٣</span>
              <p className="text-gray-700">قم بتغليف المنتج بشكل آمن في عبوته الأصلية مع إرفاق رقم طلب الإرجاع</p>
            </li>
            <li className="flex items-start justify-end gap-3">
              <span className="bg-pink-100 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-bold text-pink-600">٤</span>
              <p className="text-gray-700">سيتم استلام المنتج ومعالجة طلبك خلال 48 ساعة من وصول المنتج إلى مستودعاتنا</p>
            </li>
          </ol>
        </motion.div>
      </div>
    </section>
  );
};

// مكون باقات العروض
const BundlesSection = () => {
  const bundlesData = [
    {
      title: "عرض المحبين",
      description: "لعشاق القهوة، مجين بألوان جذابة لتجربة مزدوجة",
      price: 179,
      originalPrice: 308,
      items: ["عدد 2 مسخن قهوة كهربائي (لونين مختلفين)"],
      image: "img1",
      color: "from-pink-600 to-pink-500",
      quantity: 2
    },
    {
      title: "ثلاثية الدفء",
      description: "ثلاثة مجات لدفء يدوم طوال اليوم",
      price: 249,
      originalPrice: 462,
      items: ["عدد 3 مسخن قهوة كهربائي (ألوان متنوعة)"],
      image: "img3",
      color: "from-green-800 to-green-600",
      quantity: 3
    },
    {
      title: "أسطورة الأربعة",
      description: "أربعة مجات لتجربة أسطورية لا تُنسى",
      price: 299,
      originalPrice: 616,
      items: ["عدد 4 مسخن قهوة كهربائي (ألوان متنوعة)"],
      image: "img2",
      color: "from-blue-600 to-blue-800",
      quantity: 4
    }
  ];

  return (
    <section id="bundles" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900 mb-4">عروض المجات المذهلة</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">استمتع بمشروبك بأفضل الأسعار مع باقاتنا الفاخرة</p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bundlesData.map((bundle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              <div className={`h-3 bg-gradient-to-r ${bundle.color}`}></div>
              <div className="p-4 sm:p-6">
                <div className="flex justify-end mb-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Gift size={24} className={`text-${bundle.color.split('-')[1]}-600`} />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-2 text-right">{bundle.title}</h3>
                <p className="text-gray-600 mb-4 text-right text-sm sm:text-base">{bundle.description}</p>
                
                <ul className="space-y-2 mb-4 text-right">
                  {bundle.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center justify-end gap-2">
                      <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                      <Check size={16} className="text-green-600 flex-shrink-0" />
                    </li>
                  ))}
                </ul>
                
                <div className="bg-gray-50 p-3 rounded-xl mb-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-pink-500 text-white text-xs sm:text-sm px-2 py-1 rounded-full font-medium">
                      وفر {Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100)}%
                    </span>
                    <div className="text-right">
                      <span className="text-lg sm:text-2xl font-bold text-green-900">{bundle.price} ريال</span>
                      <span className="text-sm sm:text-lg text-gray-500 line-through mr-2">{bundle.originalPrice} ريال</span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2 sm:py-3 bg-gradient-to-r ${bundle.color} text-white rounded-lg font-bold text-sm sm:text-lg hover:shadow-lg transition-all duration-300`}
                  onClick={() => {
                    const orderForm = document.getElementById('order-form');
                    if (orderForm) {
                      orderForm.scrollIntoView({ behavior: 'smooth' });
                      window.dispatchEvent(new CustomEvent('addBundle', { 
                        detail: { 
                          quantity: bundle.quantity, 
                          bundlePrice: bundle.price,
                          bundleTitle: bundle.title
                        } 
                      }));
                    }
                  }}
                >
                  أضف العرض للطلب
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-base sm:text-lg text-gray-600 mb-4">كل العروض تشمل التوصيل المجاني والضمان لمدة شهر</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-green-600" />
              <span className="text-green-900 font-medium">توصيل سريع</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-green-600" />
              <span className="text-green-900 font-medium">ضمان شهر</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// المكون الرئيسي App
const App: React.FC = () => {
  type Color = "أخضر" | "وردي";
  const [colorQuantities, setColorQuantities] = useState<{ [key in Color]: number }>({
    "أخضر": 0,
    "وردي": 0,
  });
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [logoSrc, setLogoSrc] = useState<string>('');
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [selectedBundles, setSelectedBundles] = useState<{ title: string; quantity: number; bundlePrice: number }[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(12 * 60 * 60); // 12 ساعة بالثواني

  const defaultPrice = 100;
  const originalPrice = 154;

  const imageKeys = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'] as const;

  useEffect(() => {
    Promise.all(imageKeys.map(key => productImages[key]()))
      .then(sources => {
        setLoadedImages(sources);
        setSelectedImage(sources[0] || '');
      })
      .catch(err => console.error("Error loading product images:", err));
    
    productImages.logo()
      .then(src => setLogoSrc(src))
      .catch(err => {
        console.error("Error loading logo:", err);
        setLogoSrc('fallback');
      });

    const handleAddBundle = (event: Event) => {
      const customEvent = event as CustomEvent<{ quantity: number; bundlePrice: number; bundleTitle: string }>;
      const { quantity, bundlePrice, bundleTitle } = customEvent.detail;
      addBundle(bundleTitle, quantity, bundlePrice);
    };

    window.addEventListener('addBundle', handleAddBundle);

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.removeEventListener('addBundle', handleAddBundle);
      clearInterval(timer);
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBundles = () => {
    document.getElementById('bundles')?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculateTotal = () => {
    const bundlesTotal = selectedBundles.reduce((sum, bundle) => sum + bundle.bundlePrice, 0);
    const totalQuantityFromBundles = selectedBundles.reduce((sum, bundle) => sum + bundle.quantity, 0);
    const totalQuantity = Object.values(colorQuantities).reduce((sum, qty) => sum + qty, 0);
    const extraQuantity = Math.max(0, totalQuantity - totalQuantityFromBundles);
    const extraTotal = extraQuantity * defaultPrice;

    return bundlesTotal + extraTotal;
  };

  const updateQuantity = (color: Color, change: number) => {
    setColorQuantities(prev => ({
      ...prev,
      [color]: Math.max(0, prev[color] + change),
    }));
  };

  const removeBundle = (index: number) => {
    const bundleToRemove = selectedBundles[index];
    setSelectedBundles(prev => prev.filter((_, i) => i !== index));
    setColorQuantities(prev => ({
      أخضر: Math.max(0, prev.أخضر - Math.floor(bundleToRemove.quantity / 2)),
      وردي: Math.max(0, prev.وردي - Math.ceil(bundleToRemove.quantity / 2)),
    }));
  };

  const addBundle = (title: string, quantity: number, bundlePrice: number) => {
    setSelectedBundles(prev => [...prev, { title, quantity, bundlePrice }]);
    setColorQuantities(prev => ({
      أخضر: prev.أخضر + Math.floor(quantity / 2),
      وردي: prev.وردي + Math.ceil(quantity / 2),
    }));
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const descriptionItems = [
    { icon: "☕", text: "تحكم ممتاز: يحافظ على دفء المشروب كما تريد" },
    { icon: "🧼", text: "سهل التنظيف: خفيف ومناسب في أي مكان" },
    { icon: "🔥", text: "تسخين قوي: آمن وسريع" },
    { icon: "🛡️", text: "متين للغاية: يقاوم الحرارة والسوائل" },
    { icon: "🎁", text: "تصميم أنيق: أخضر داكن أو وردي" },
  ];

  const handleImageClick = (image: string) => {
    setZoomedImage(image);
    setIsImageZoomed(true);
  };

  const closeZoomedImage = () => {
    setIsImageZoomed(false);
    setZoomedImage(null);
  };

  const FallbackLogo = () => (
    <div className="flex items-center">
      <span className="text-xl sm:text-2xl font-extrabold text-green-900">Heat<span className="text-pink-500">Mug</span></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans text-right">
      <Header logoSrc={logoSrc === 'fallback' ? null : logoSrc} />
      
      <section className="relative pt-24 pb-12 overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <motion.div 
        className="space-y-6 flex-1"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-900 leading-tight tracking-wide text-center md:text-right"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          استمتع بمشروبك دافئ في آي وقت!
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed text-center md:text-right"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          مسخن قهوة كهربائي بتصميم عصري وأداء قوي - اطلبه الآن بخصم 35%!
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <motion.button 
            onClick={scrollToForm}
            className="px-6 py-3 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-lg font-bold text-base sm:text-lg shadow-lg flex items-center gap-2 hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            اطلب الآن
          </motion.button>
          <motion.button 
            onClick={scrollToBundles}
            className="px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-lg font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            شوف العروض
          </motion.button>
        </div>
      </motion.div>
      <div className="flex flex-col items-center gap-4 flex-1">
        <HeroImage />
        <motion.div 
          className="text-center text-white bg-gradient-to-r from-pink-600 to-pink-500 px-6 py-2 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-base sm:text-lg font-bold">الخصم ينتهي خلال: <span>{formatTime(timeLeft)}</span></p>
        </motion.div>
      </div>
    </div>
  </div>
</section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div 
              className="space-y-6 flex-1"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="عرض المنتج"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 cursor-pointer"
                    onClick={() => handleImageClick(selectedImage)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">جاري التحميل...</div>
                )}
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {loadedImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === image ? 'border-green-900' : 'border-gray-300'} hover:border-green-600`}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img src={image} alt={`صورة ${index + 1}`} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="space-y-6 flex-1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="bg-gray-50 p-4 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-pink-500 text-white text-sm sm:text-lg px-3 py-1 rounded-full font-semibold">خصم 35%</span>
                    <p className="text-xs sm:text-sm text-gray-600">شامل الضريبة</p>
                  </div>
                  <span className="text-right">
                    <span className="text-2xl sm:text-3xl font-bold text-green-900">{defaultPrice} ريال</span>
                    <span className="text-base sm:text-lg text-gray-500 line-through ml-2">{originalPrice} ريال</span>
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {descriptionItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl text-pink-600">{item.icon}</span>
                    <p className="text-gray-700 text-base sm:text-lg">{item.text}</p>
                  </div>
                ))}
              </div>
              <motion.button 
                onClick={scrollToBundles}
                className="w-full py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-lg font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                شوف العروض
              </motion.button>
              <motion.button 
                onClick={scrollToForm}
                className="w-full py-3 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-lg font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                اطلب الآن
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {isImageZoomed && zoomedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeZoomedImage}
        >
          <motion.img
            src={zoomedImage}
            alt="صورة مكبرة"
            className="max-w-[90%] max-h-[90%] object-contain"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl bg-red-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition-colors"
            onClick={closeZoomedImage}
          >
            ×
          </button>
        </motion.div>
      )}

      <section id="features" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-green-900"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ليش تختاره؟
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <FeatureCard icon={<ThermometerSun size={40} />} title="تحكم فاخر" description="الحرارة على مزاجك" />
            <FeatureCard icon={<Coffee size={40} />} title="تصميم أنيق" description="خفيف ومميز" />
            <FeatureCard icon={<Battery size={40} />} title="تسخين سريع" description="دفء فوري بأمان" />
            <FeatureCard icon={<CheckCircle size={40} />} title="جودة عالية" description="يدوم معك طويل" />
          </div>
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.button 
              onClick={scrollToBundles}
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-lg font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              شوف العروض
            </motion.button>
          </motion.div>
        </div>
      </section>

      <BundlesSection />

      <section id="order-form" className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            dir="rtl"
            className="bg-white text-green-900 rounded-2xl p-6 shadow-2xl max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-6 text-right">اطلب بكل سهولة الآن!</h3>
            <div className="space-y-4 mb-6">
              {[
                { placeholder: "الاسم الكامل", icon: User, name: "fullName" },
                { placeholder: "رقم الجوال", icon: Phone, name: "phone" },
                { placeholder: "العنوان", icon: MapPin, name: "address" },
              ].map((field, index) => (
                <div key={index} className="relative">
                  <input 
                    type={field.placeholder === "رقم الجوال" ? "tel" : "text"}
                    placeholder={field.placeholder}
                    name={field.name}
                    className="w-full p-3 border border-gray-200 rounded-xl text-right pr-10 focus:ring-2 focus:ring-green-900 focus:border-transparent transition-all duration-300"
                  />
                  <field.icon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-900" size={18} />
                </div>
              ))}
            </div>

            {selectedBundles.length > 0 && (
              <div className="mb-6 text-right">
                <h4 className="text-lg sm:text-xl font-bold mb-4">العروض المختارة</h4>
                <div className="space-y-3">
                  {selectedBundles.map((bundle, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeBundle(index)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                        <span className="text-gray-700 text-sm sm:text-base">{bundle.title} ({bundle.quantity} قطع - {bundle.bundlePrice} ريال)</span>
                      </div>
                      <button
                        onClick={() => addBundle(bundle.title, bundle.quantity, bundle.bundlePrice)}
                        className="text-green-600 hover:text-green-800 transition-colors"
                      >
                        <span className="text-xl font-bold">+</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6 text-right">
              <h4 className="text-lg sm:text-xl font-bold mb-4">اختر اللون والكمية</h4>
              <div className="space-y-4">
                {[
                  { name: "أخضر", value: "أخضر" as const, color: "bg-green-900" },
                  { name: "وردي", value: "وردي" as const, color: "bg-pink-500" },
                ].map((colorOption, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-full ${colorOption.color}`}></span>
                      <span className="font-bold text-base sm:text-lg">{colorOption.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(colorOption.value, -1)} 
                        className="w-8 h-8 bg-gray-200 rounded-full text-lg font-bold hover:bg-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold">{colorQuantities[colorOption.value]}</span>
                      <button 
                        onClick={() => updateQuantity(colorOption.value, 1)} 
                        className="w-8 h-8 bg-pink-500 text-white rounded-full text-lg font-bold hover:bg-pink-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-4 flex-row-reverse">
                <span className="text-2xl sm:text-3xl font-extrabold text-green-900">{calculateTotal()} ريال</span>
                <span className="font-bold text-base sm:text-lg">الإجمالي</span>
              </div>
              <motion.button 
                className="w-full py-3 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-lg font-bold text-base sm:text-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                اشتري الآن
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-green-900"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            وش قالوا العملاء؟
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "أحمد", text: "منتج فخم، القهوة دايم دافئة!" },
              { name: "سارة", text: "تصميمه رائع والخدمة متميزة، أنصح به بشدة" },
              { name: "محمد", text: "استخدمه يومياً، مسخن القهوة الأفضل جربته" }
            ].map((review, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex justify-end mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-500 fill-yellow-500 mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 text-base sm:text-lg mb-4">"{review.text}"</p>
                <p className="font-bold text-lg sm:text-xl text-green-900">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      
      <ReturnPolicySection />

      <section className="py-16 bg-gradient-to-r from-pink-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-extrabold mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            خصم 35% الآن!
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            لا تفوت الفرصة - اطلب مسخن القهوة اليوم واستمتع بخبرة فريدة!
          </motion.p>
          <motion.button 
            onClick={scrollToForm}
            className="px-6 py-3 bg-white text-green-900 rounded-lg font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            اطلب قبل ما يخلّص
          </motion.button>
        </div>
      </section>

      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              {logoSrc === 'fallback' ? (
                <FallbackLogo />
              ) : logoSrc ? (
                <img src={logoSrc} alt="HeatMug Logo" className="h-12 object-contain bg-white p-2 rounded-lg" />
              ) : (
                <div className="w-24 h-8 bg-gray-200 animate-pulse rounded"></div>
              )}
            </div>
            <div className="flex flex-wrap gap-4 justify-center mb-4 md:mb-0">
              {['الرئيسية', 'المميزات', 'الباقات', 'الطلب', 'الآراء', 'الأسئلة', 'الإرجاع'].map((item, index) => (
                <a 
                  key={index} 
                  href={`#${item === 'الرئيسية' ? '' : item === 'المميزات' ? 'features' : item === 'الباقات' ? 'bundles' : item === 'الطلب' ? 'order-form' : item === 'الآراء' ? 'testimonials' : item === 'الأسئلة' ? 'faq' : 'return-policy'}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {item}
                </a>
              ))}
            </div>
            <p className="font-bold text-sm sm:text-base">© 2025 HeatMug - جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;