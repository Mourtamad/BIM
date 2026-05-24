# 📚 توثيق API المفصل - منصة التجارة الإلكترونية

دليل شامل لجميع مسارات API مع أمثلة عملية وشاملة.

---

## 📑 جدول المحتويات

1. [المصادقة (Authentication)](#المصادقة)
2. [الاشتراكات (Subscriptions)](#الاشتراكات)
3. [العمولات (Commissions)](#العمولات)
4. [التقييمات (Reviews)](#التقييمات)
5. [الكوبونات (Coupons)](#الكوبونات)
6. [الإعلانات (Advertisements)](#الإعلانات)
7. [الإيرادات (Revenue)](#الإيرادات)
8. [المنتجات (Products)](#المنتجات)
9. [الطلبات (Orders)](#الطلبات)
10. [المستخدمون (Users)](#المستخدمون)

---

## 🔐 المصادقة

### التسجيل (Register)

**المسار:** `POST /api/auth/register`

**الوصف:** إنشاء حساب مستخدم جديد

**متطلبات الرأس (Headers):**
```
Content-Type: application/json
```

**جسم الطلب (Request Body):**
```json
{
  "name": "محمود أحمد",
  "email": "mahmoud@example.com",
  "password": "password123",
  "phone": "0501234567",
  "role": "seller"
}
```

**المتغيرات:**
- `name` (string, مطلوب): اسم المستخدم
- `email` (string, مطلوب): البريد الإلكتروني
- `password` (string, مطلوب): كلمة المرور (يجب أن تكون 6 أحرف على الأقل)
- `phone` (string, مطلوب): رقم الهاتف
- `role` (string, اختياري): نوع المستخدم (user, seller, admin) - الافتراضي: user

**الاستجابة الناجحة (201):**
```json
{
  "message": "تم إنشاء الحساب بنجاح",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "محمود أحمد",
    "email": "mahmoud@example.com",
    "role": "seller"
  }
}
```

**الأخطاء المحتملة:**
```json
{
  "message": "المستخدم موجود بالفعل"
}
```

---

### تسجيل الدخول (Login)

**المسار:** `POST /api/auth/login`

**الوصف:** تسجيل الدخول والحصول على التوكن

**جسم الطلب:**
```json
{
  "email": "mahmoud@example.com",
  "password": "password123"
}
```

**الاستجابة الناجحة (200):**
```json
{
  "message": "تم تسجيل الدخول بنجاح",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "محمود أحمد",
    "email": "mahmoud@example.com",
    "role": "seller"
  }
}
```

---

### التحقق من التوكن (Verify Token)

**المسار:** `GET /api/auth/me`

**الوصف:** الحصول على بيانات المستخدم الحالي

**متطلبات الرأس (Headers):**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**الاستجابة الناجحة (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "محمود أحمد",
    "email": "mahmoud@example.com",
    "role": "seller"
  }
}
```

---

## 💳 الاشتراكات

### جلب جميع الخطط (Get All Plans)

**المسار:** `GET /api/subscriptions/plans`

**الوصف:** الحصول على قائمة بجميع خطط الاشتراك المتاحة

**المعاملات (Parameters):** لا يوجد

**الاستجابة الناجحة (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "free",
    "displayName": "الخطة المجانية",
    "description": "خطة أساسية بدون رسوم",
    "price": 0,
    "billingCycle": "monthly",
    "features": {
      "maxProducts": 10,
      "maxOrders": 100,
      "advancedAnalytics": false,
      "prioritySupport": false,
      "customDomain": false,
      "apiAccess": false,
      "bulkUpload": false,
      "automatedMarketing": false
    },
    "commission": 20
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "professional",
    "displayName": "الخطة الاحترافية",
    "description": "خطة احترافية مع جميع الميزات",
    "price": 150,
    "billingCycle": "monthly",
    "features": {
      "maxProducts": 500,
      "maxOrders": 5000,
      "advancedAnalytics": true,
      "prioritySupport": true,
      "customDomain": true,
      "apiAccess": true,
      "bulkUpload": true,
      "automatedMarketing": true
    },
    "commission": 10
  }
]
```

---

### جلب خطة واحدة (Get Single Plan)

**المسار:** `GET /api/subscriptions/plans/:id`

**الوصف:** الحصول على تفاصيل خطة معينة

**المعاملات:**
- `id` (string, مطلوب): معرف الخطة

**الاستجابة الناجحة (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "professional",
  "displayName": "الخطة الاحترافية",
  "description": "خطة احترافية مع جميع الميزات",
  "price": 150,
  "billingCycle": "monthly",
  "features": {
    "maxProducts": 500,
    "maxOrders": 5000,
    "advancedAnalytics": true,
    "prioritySupport": true,
    "customDomain": true,
    "apiAccess": true,
    "bulkUpload": true,
    "automatedMarketing": true
  },
  "commission": 10
}
```

---

### الاشتراك في خطة (Subscribe to Plan)

**المسار:** `POST /api/subscriptions/subscribe`

**الوصف:** الاشتراك في خطة معينة

**جسم الطلب:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "planId": "507f1f77bcf86cd799439012",
  "paymentMethod": "credit_card"
}
```

**المتغيرات:**
- `userId` (string, مطلوب): معرف المستخدم
- `planId` (string, مطلوب): معرف الخطة
- `paymentMethod` (string, مطلوب): طريقة الدفع

**الاستجابة الناجحة (201):**
```json
{
  "message": "تم الاشتراك بنجاح",
  "subscription": {
    "_id": "507f1f77bcf86cd799439013",
    "user": "507f1f77bcf86cd799439011",
    "plan": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "professional",
      "displayName": "الخطة الاحترافية",
      "price": 150
    },
    "status": "active",
    "startDate": "2026-05-24T21:55:00Z",
    "endDate": "2026-06-24T21:55:00Z",
    "autoRenew": true,
    "paymentMethod": "credit_card",
    "amount": 150,
    "createdAt": "2026-05-24T21:55:00Z"
  },
  "plan": "الخطة الاحترافية"
}
```

---

### جلب اشتراك المستخدم (Get User Subscription)

**المسار:** `GET /api/subscriptions/my-subscription/:userId`

**الوصف:** الحصول على بيانات اشتراك المستخدم الحالي

**المعاملات:**
- `userId` (string, مطلوب): معرف المستخدم

**الاستجابة الناجحة (200):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "user": "507f1f77bcf86cd799439011",
  "plan": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "professional",
    "displayName": "الخطة الاحترافية",
    "price": 150,
    "features": {
      "maxProducts": 500,
      "advancedAnalytics": true
    }
  },
  "status": "active",
  "startDate": "2026-05-24T21:55:00Z",
  "endDate": "2026-06-24T21:55:00Z",
  "autoRenew": true
}
```

---

### إلغاء الاشتراك (Cancel Subscription)

**المسار:** `POST /api/subscriptions/cancel/:subscriptionId`

**الوصف:** إلغاء الاشتراك في الخطة الحالية

**المعاملات:**
- `subscriptionId` (string, مطلوب): معرف الاشتراك

**الاستجابة الناجحة (200):**
```json
{
  "message": "تم إلغاء الاشتراك",
  "subscription": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "cancelled",
    "autoRenew": false,
    "endDate": "2026-06-24T21:55:00Z"
  }
}
```

---

## 💰 العمولات

### حساب العمولة (Calculate Commission)

**المسار:** `POST /api/commissions/calculate`

**الوصف:** حساب العمولة على طلب معين تلقائياً

**جسم الطلب:**
```json
{
  "orderId": "507f1f77bcf86cd799439015"
}
```

**الاستجابة الناجحة (201):**
```json
{
  "message": "تم حساب العمولة",
  "commission": {
    "_id": "507f1f77bcf86cd799439016",
    "order": "507f1f77bcf86cd799439015",
    "seller": "507f1f77bcf86cd799439011",
    "orderAmount": 200,
    "commissionRate": 10,
    "commissionAmount": 20,
    "platformProfit": 20,
    "sellerProfit": 180,
    "status": "confirmed",
    "createdAt": "2026-05-24T21:55:00Z"
  }
}
```

**شرح الحقول:**
- `orderAmount`: إجمالي قيمة الطلب
- `commissionRate`: نسبة العمولة (تختلف حسب خطة الاشتراك)
- `commissionAmount`: قيمة العمولة (ربح المنصة)
- `platformProfit`: ربح المنصة من الطلب
- `sellerProfit`: ربح البائع من الطلب

---

### جلب عمولات البائع (Get Seller Commissions)

**المسار:** `GET /api/commissions/seller/:sellerId`

**الوصف:** جلب جميع عمولات بائع معين

**المعاملات:**
- `sellerId` (string, مطلوب): معرف البائع
- `status` (string, اختياري): حالة العمولة (pending, confirmed, paid, failed)

**مثال الطلب:**
```
GET /api/commissions/seller/507f1f77bcf86cd799439011?status=confirmed
```

**الاستجابة الناجحة (200):**
```json
{
  "commissions": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "order": {
        "_id": "507f1f77bcf86cd799439015",
        "orderNumber": "ORD1685049300000ABC123",
        "finalAmount": 200
      },
      "orderAmount": 200,
      "commissionRate": 10,
      "commissionAmount": 20,
      "platformProfit": 20,
      "sellerProfit": 180,
      "status": "confirmed",
      "createdAt": "2026-05-24T21:55:00Z"
    }
  ],
  "summary": {
    "totalCommission": 100,
    "totalPlatformProfit": 100,
    "totalSellerProfit": 900,
    "totalOrders": 5
  }
}
```

---

### جلب عمولات المنصة (Get Platform Commissions)

**المسار:** `GET /api/commissions/platform/all`

**الوصف:** جلب جميع العمولات (للمسؤولين فقط)

**الاستجابة الناجحة (200):**
```json
{
  "commissions": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "seller": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "محمود أحمد",
        "storeName": "متجري المميز"
      },
      "orderAmount": 200,
      "commissionAmount": 20,
      "platformProfit": 20,
      "sellerProfit": 180,
      "status": "confirmed",
      "createdAt": "2026-05-24T21:55:00Z"
    }
  ],
  "summary": {
    "totalOrders": 1000,
    "totalPlatformProfit": 50000,
    "totalSellerProfit": 450000,
    "averageCommission": 50
  }
}
```

---

### تحديث حالة العمولة (Mark as Paid)

**المسار:** `PUT /api/commissions/:commissionId/paid`

**الوصف:** تحديث حالة العمولة إلى "مدفوعة"

**جسم الطلب:**
```json
{}
```

**الاستجابة الناجحة (200):**
```json
{
  "message": "تم تحديث حالة العمولة",
  "commission": {
    "_id": "507f1f77bcf86cd799439016",
    "status": "paid",
    "paymentDate": "2026-05-25T10:00:00Z",
    "commissionAmount": 20
  }
}
```

---

## ⭐ التقييمات والمراجعات

### إضافة مراجعة (Create Review)

**المسار:** `POST /api/reviews`

**الوصف:** إضافة مراجعة جديدة على منتج

**جسم الطلب:**
```json
{
  "productId": "507f1f77bcf86cd799439020",
  "orderId": "507f1f77bcf86cd799439015",
  "customerId": "507f1f77bcf86cd799439011",
  "rating": 5,
  "title": "منتج ممتاز جداً",
  "comment": "المنتج وصل بسرعة وجودته عالية جداً. أنصح به بشدة!",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ]
}
```

**المتغيرات:**
- `productId` (string, مطلوب): معرف المنتج
- `orderId` (string, مطلوب): معرف الطلب
- `customerId` (string, مطلوب): معرف المشتري
- `rating` (number, مطلوب): التقييم من 1 إلى 5
- `title` (string, مطلوب): عنوان المراجعة
- `comment` (string, مطلوب): تفاصيل المراجعة
- `images` (array, اختياري): صور المراجعة

**الاستجابة الناجحة (201):**
```json
{
  "message": "تم إضافة المراجعة بنجاح (قيد الانتظار للموافقة)",
  "review": {
    "_id": "507f1f77bcf86cd799439021",
    "product": "507f1f77bcf86cd799439020",
    "seller": "507f1f77bcf86cd799439010",
    "customer": "507f1f77bcf86cd799439011",
    "order": "507f1f77bcf86cd799439015",
    "rating": 5,
    "title": "منتج ممتاز جداً",
    "comment": "المنتج وصل بسرعة وجودته عالية جداً",
    "status": "pending",
    "helpful": 0,
    "notHelpful": 0,
    "createdAt": "2026-05-24T21:55:00Z"
  }
}
```

---

### جلب مراجعات المنتج (Get Product Reviews)

**المسار:** `GET /api/reviews/product/:productId`

**الوصف:** جلب جميع مراجعات منتج معين (المعتمدة فقط)

**المعاملات:**
- `productId` (string, مطلوب): معرف المنتج

**الاستجابة الناجحة (200):**
```json
{
  "reviews": [
    {
      "_id": "507f1f77bcf86cd799439021",
      "rating": 5,
      "title": "منتج ممتاز جداً",
      "comment": "المنتج وصل بسرعة وجودته عالية جداً",
      "customer": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "محمود أحمد",
        "avatar": "https://example.com/avatar.jpg"
      },
      "helpful": 15,
      "notHelpful": 2,
      "createdAt": "2026-05-24T21:55:00Z"
    }
  ],
  "summary": {
    "totalReviews": 50,
    "averageRating": 4.6,
    "ratingCounts": {
      "5": 35,
      "4": 10,
      "3": 3,
      "2": 2,
      "1": 0
    }
  }
}
```

---

### الموافقة على مراجعة (Approve Review)

**المسار:** `PUT /api/reviews/:reviewId/approve`

**الوصف:** الموافقة على مراجعة معينة (للبائعين والمسؤولين)

**المعاملات:**
- `reviewId` (string, مطلوب): معرف المراجعة

**الاستجابة الناجحة (200):**
```json
{
  "message": "تم الموافقة على المراجعة",
  "review": {
    "_id": "507f1f77bcf86cd799439021",
    "status": "approved",
    "rating": 5,
    "title": "منتج ممتاز جداً"
  }
}
```

---

### تحديد مراجعة كمفيدة (Mark as Helpful)

**المسار:** `PUT /api/reviews/:reviewId/helpful`

**الوصف:** تحديد مراجعة كمفيدة

**جسم الطلب:**
```json
{}
```

**الاستجابة الناجحة (200):**
```json
{
  "message": "شكراً لتقييمك",
  "review": {
    "_id": "507f1f77bcf86cd799439021",
    "helpful": 16,
    "notHelpful": 2
  }
}
```

---

## 🎁 الكوبونات والخصومات

### إنشاء كوبون (Create Coupon)

**المسار:** `POST /api/coupons`

**الوصف:** إنشاء كوبون خصم جديد (للمسؤولين)

**جسم الطلب:**
```json
{
  "code": "SUMMER50",
  "description": "خصم صيفي 50%",
  "discountType": "percentage",
  "discountValue": 50,
  "maxDiscount": 500,
  "minOrderAmount": 100,
  "maxUses": 100,
  "validFrom": "2026-06-01T00:00:00Z",
  "validUntil": "2026-08-31T23:59:59Z",
  "applicableCategories": ["electronics", "fashion"],
  "applicableSellers": ["507f1f77bcf86cd799439010"],
  "createdBy": "507f1f77bcf86cd799439000"
}
```

**المتغيرات:**
- `code` (string, مطلوب): كود الكوبون
- `description` (string, اختياري): وصف الكوبون
- `discountType` (string, مطلوب): نوع الخصم (percentage, fixed)
- `discountValue` (number, مطلوب): قيمة الخصم
- `maxDiscount` (number, اختياري): الحد الأقصى للخصم
- `minOrderAmount` (number, اختياري): الحد الأدنى لقيمة الطلب
- `maxUses` (number, اختياري): عدد الاستخدامات المسموح به
- `validFrom` (date, مطلوب): تاريخ البداية
- `validUntil` (date, مطلوب): تاريخ الانتهاء

**الاستجابة الناجحة (201):**
```json
{
  "message": "تم إنشاء كوبون خصم جديد",
  "coupon": {
    "_id": "507f1f77bcf86cd799439022",
    "code": "SUMMER50",
    "description": "خصم صيفي 50%",
    "discountType": "percentage",
    "discountValue": 50,
    "maxDiscount": 500,
    "minOrderAmount": 100,
    "maxUses": 100,
    "usedCount": 0,
    "validFrom": "2026-06-01T00:00:00Z",
    "validUntil": "2026-08-31T23:59:59Z",
    "isActive": true,
    "createdAt": "2026-05-24T21:55:00Z"
  }
}
```

---

### التحقق من الكوبون (Validate Coupon)

**المسار:** `POST /api/coupons/validate`

**الوصف:** التحقق من صحة الكوبون وحساب الخصم

**جسم الطلب:**
```json
{
  "code": "SUMMER50",
  "orderAmount": 200,
  "category": "electronics",
  "sellerId": "507f1f77bcf86cd799439010"
}
```

**الاستجابة الناجحة (200):**
```json
{
  "valid": true,
  "message": "تم تطبيق الكوبون بنجاح",
  "discount": 100,
  "finalAmount": 100,
  "couponCode": "SUMMER50"
}
```

**ملاحظات:**
- الخصم = 200 × 50% = 100 ريال
- المبلغ النهائي = 200 - 100 = 100 ريال

---

### جلب الكوبونات الفعالة (Get Active Coupons)

**المسار:** `GET /api/coupons/active`

**الوصف:** جلب جميع الكوبونات الفعالة حالياً

**الاستجابة الناجحة (200):**
```json
[
  {
    "code": "SUMMER50",
    "description": "خصم صيفي 50%",
    "discountType": "percentage",
    "discountValue": 50,
    "minOrderAmount": 100
  },
  {
    "code": "WELCOME100",
    "description": "مرحبا بك - 100 ريال خصم",
    "discountType": "fixed",
    "discountValue": 100,
    "minOrderAmount": 500
  }
]
```

---

### استخدام الكوبون (Use Coupon)

**المسار:** `POST /api/coupons/:couponId/use`

**الوصف:** تحديث عدد استخدامات الكوبون

**المعاملات:**
- `couponId` (string, مطلوب): معرف الكوبون

**الاستجابة الناجحة (200):**
```json
{
  "message": "تم تحديث استخدام الكوبون",
  "coupon": {
    "_id": "507f1f77bcf86cd799439022",
    "code": "SUMMER50",
    "usedCount": 50,
    "maxUses": 100
  }
}
```

---

## 📢 الإعلانات

### إنشاء إعلان (Create Advertisement)

**المسار:** `POST /api/advertisements`

**الوصف:** إنشاء إعلان جديد

**جسم الطلب:**
```json
{
  "sellerId": "507f1f77bcf86cd799439011",
  "type": "featured_product",
  "productId": "507f1f77bcf86cd799439020",
  "title": "منتج مميز جديد",
  "description": "اكتشف منتجنا الجديد المميز",
  "image": "https://example.com/ad-image.jpg",
  "link": "https://example.com/product/123",
  "cost": 200,
  "duration": 30
}
```

**المتغيرات:**
- `sellerId` (string, مطلوب): معرف البائع
- `type` (string, مطلوب): نوع الإعلان (featured_store, featured_product, banner, promoted)
- `productId` (string, اختياري): معرف المنتج (للإعلانات عن المنتجات)
- `title` (string, مطلوب): عنوان الإعلان
- `cost` (number, مطلوب): تكلفة الإعلان
- `duration` (number, مطلوب): مدة الإعلان بالأيام

**الاستجابة الناجحة (201):**
```json
{
  "message": "تم إنشاء الإعلان بنجاح (قيد المراجعة)",
  "ad": {
    "_id": "507f1f77bcf86cd799439023",
    "seller": "507f1f77bcf86cd799439011",
    "type": "featured_product",
    "title": "منتج مميز جديد",
    "cost": 200,
    "duration": 30,
    "startDate": "2026-05-24T21:55:00Z",
    "endDate": "2026-06-23T21:55:00Z",
    "status": "pending",
    "clicks": 0,
    "impressions": 0
  }
}
```

---

### جلب الإعلانات النشطة (Get Active Advertisements)

**المسار:** `GET /api/advertisements/active`

**الوصف:** جلب جميع الإعلانات النشطة حالياً

**الاستجابة الناجحة (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439023",
    "seller": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "محمود أحمد",
      "storeName": "متجري المميز",
      "avatar": "https://example.com/avatar.jpg"
    },
    "type": "featured_product",
    "title": "منتج مميز جديد",
    "product": {
      "_id": "507f1f77bcf86cd799439020",
      "name": "جهاز إلكتروني",
      "price": 500,
      "image": "https://example.com/product.jpg"
    },
    "clicks": 25,
    "impressions": 500,
    "ctr": "5%"
  }
]
```

---

### ا��موافقة على إعلان (Approve Advertisement)

**المسار:** `PUT /api/advertisements/:adId/approve`

**الوصف:** الموافقة على إعلان معين (للمسؤولين)

**المعاملات:**
- `adId` (string, مطلوب): معرف الإعلان

**الاستجابة الناجحة (200):**
```json
{
  "message": "تم الموافقة على الإعلان",
  "ad": {
    "_id": "507f1f77bcf86cd799439023",
    "status": "active",
    "paymentStatus": "completed",
    "title": "منتج مميز جديد"
  }
}
```

---

### تتبع الضغطات (Track Click)

**المسار:** `POST /api/advertisements/:adId/click`

**الوصف:** تسجيل ضغطة على الإعلان

**المعاملات:**
- `adId` (string, مطلوب): معرف الإعلان

**الاستجابة الناجحة (200):**
```json
{
  "message": "تم تسجيل الضغطة"
}
```

---

### إحصائيات الإعلان (Get Advertisement Statistics)

**المسار:** `GET /api/advertisements/:adId/stats`

**الوصف:** الحصول على إحصائيات تفصيلية للإعلان

**المعاملات:**
- `adId` (string, مطلوب): معرف الإعلان

**الاستجابة الناجحة (200):**
```json
{
  "adId": "507f1f77bcf86cd799439023",
  "title": "منتج مميز جديد",
  "type": "featured_product",
  "cost": 200,
  "impressions": 500,
  "clicks": 25,
  "ctr": "5%",
  "costPerClick": "8",
  "duration": 30,
  "status": "active",
  "roiPercentage": "12.5"
}
```

**شرح الحقول:**
- `CTR` (Click-Through Rate): نسبة الضغطات = (clicks / impressions) × 100
- `costPerClick`: تكلفة الضغطة الواحدة
- `ROI`: العائد على الاستثمار

---

## 📊 الإيرادات

### لوحة الأرباح (Platform Revenue Dashboard)

**المسار:** `GET /api/revenue/platform/revenue`

**الوصف:** جلب إجمالي أرباح المنصة

**المعاملات (Query):**
- `startDate` (date, اختياري): تاريخ البداية
- `endDate` (date, اختياري): تاريخ الانتهاء

**مثال الطلب:**
```
GET /api/revenue/platform/revenue?startDate=2026-05-01&endDate=2026-05-31
```

**الاستجابة الناجحة (200):**
```json
{
  "revenue": {
    "commissions": {
      "amount": 30000,
      "orders": 1000
    },
    "subscriptions": {
      "amount": 50000,
      "subscribers": 500
    },
    "advertisements": {
      "amount": 15000,
      "activeAds": 100
    },
    "total": 95000
  }
}
```

---

### أرباح البائع (Seller Revenue)

**المسار:** `GET /api/revenue/seller/:sellerId`

**الوصف:** جلب أرباح بائع معين

**المعاملات:**
- `sellerId` (string, مطلوب): معرف البائع
- `startDate` (date, اختياري): تاريخ البداية
- `endDate` (date, اختياري): تاريخ الانتهاء

**الاستجابة الناجحة (200):**
```json
{
  "sales": {
    "totalSales": 50000,
    "totalOrders": 250,
    "avgOrderValue": 200
  },
  "profit": {
    "totalSellerProfit": 45000,
    "totalCommission": 5000
  }
}
```

---

### التقرير الشهري (Monthly Revenue Report)

**المسار:** `GET /api/revenue/monthly/report`

**الوصف:** جلب تقرير الإيرادات الشهري

**الاستجابة الناجحة (200):**
```json
[
  {
    "_id": 1,
    "revenue": 80000,
    "orders": 800,
    "month": 1
  },
  {
    "_id": 2,
    "revenue": 95000,
    "orders": 950,
    "month": 2
  },
  {
    "_id": 3,
    "revenue": 110000,
    "orders": 1100,
    "month": 3
  }
]
```

---

## 🛍️ المنتجات

### جلب جميع المنتجات (Get All Products)

**المسار:** `GET /api/products`

**الوصف:** جلب جميع المنتجات المتاحة

**المعاملات (Query):**
- `category` (string, اختياري): فئة المنتج
- `minPrice` (number, اختياري): الحد الأدنى للسعر
- `maxPrice` (number, اختياري): الحد الأقصى للسعر
- `search` (string, اختياري): البحث بالاسم

**مثال الطلب:**
```
GET /api/products?category=electronics&minPrice=100&maxPrice=1000&search=phone
```

**الاستجابة الناجحة (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "name": "هاتف ذكي",
    "description": "هاتف ذكي بأحدث التقنيات",
    "price": 800,
    "cost": 600,
    "quantity": 50,
    "category": "electronics",
    "rating": 4.5,
    "reviews": 120,
    "discount": 10,
    "seller": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "محمود أحمد",
      "storeName": "متجري المميز"
    },
    "images": ["https://example.com/phone.jpg"],
    "isActive": true,
    "createdAt": "2026-05-20T00:00:00Z"
  }
]
```

---

### إضافة منتج (Create Product)

**المسار:** `POST /api/products`

**الوصف:** إضافة منتج جديد (للبائعين)

**جسم الطلب:**
```json
{
  "name": "هاتف ذكي",
  "description": "هاتف ذكي بأحدث التقنيات",
  "price": 800,
  "cost": 600,
  "quantity": 50,
  "category": "electronics",
  "sku": "PHONE-001",
  "sellerId": "507f1f77bcf86cd799439011",
  "images": ["https://example.com/phone.jpg"],
  "tags": ["هاتف", "ذكي", "الكترونيات"]
}
```

**الاستجابة الناجحة (201):**
```json
{
  "message": "تم إنشاء المنتج بنجاح",
  "product": {
    "_id": "507f1f77bcf86cd799439020",
    "name": "هاتف ذكي",
    "price": 800,
    "quantity": 50,
    "seller": "507f1f77bcf86cd799439011",
    "isActive": true,
    "createdAt": "2026-05-24T21:55:00Z"
  }
}
```

---

## 📦 الطلبات

### إنشاء طلب (Create Order)

**المسار:** `POST /api/orders`

**الوصف:** إنشاء طلب جديد

**جسم الطلب:**
```json
{
  "customerId": "507f1f77bcf86cd799439011",
  "sellerId": "507f1f77bcf86cd799439010",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439020",
      "quantity": 2
    }
  ],
  "paymentMethod": "credit_card",
  "shippingAddress": {
    "fullName": "محمود أحمد",
    "phone": "0501234567",
    "address": "شارع النيل",
    "city": "القاهرة",
    "state": "القاهرة",
    "postalCode": "11111",
    "country": "مصر"
  }
}
```

**الاستجابة الناجحة (201):**
```json
{
  "message": "تم إنشاء الطلب بنجاح",
  "order": {
    "_id": "507f1f77bcf86cd799439015",
    "orderNumber": "ORD1685049300000ABC123",
    "customer": "507f1f77bcf86cd799439011",
    "seller": "507f1f77bcf86cd799439010",
    "items": [
      {
        "product": "507f1f77bcf86cd799439020",
        "quantity": 2,
        "price": 800,
        "subtotal": 1600
      }
    ],
    "totalAmount": 1600,
    "finalAmount": 1600,
    "status": "pending",
    "paymentStatus": "pending",
    "createdAt": "2026-05-24T21:55:00Z"
  }
}
```

---

### جلب الطلبات (Get Orders)

**المسار:** `GET /api/orders`

**الوصف:** جلب الطلبات

**المعاملات (Query):**
- `status` (string, اختياري): حالة الطلب
- `customerId` (string, اختياري): معرف العميل
- `sellerId` (string, اختياري): معرف البائع

**الاستجابة الناجحة (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "orderNumber": "ORD1685049300000ABC123",
    "customer": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "محمود أحمد",
      "email": "mahmoud@example.com"
    },
    "seller": {
      "_id": "507f1f77bcf86cd799439010",
      "name": "أحمد محمود",
      "storeName": "المتجر"
    },
    "totalAmount": 1600,
    "status": "pending",
    "paymentStatus": "pending",
    "createdAt": "2026-05-24T21:55:00Z"
  }
]
```

---

### تحديث حالة الطلب (Update Order Status)

**المسار:** `PUT /api/orders/:orderId/status`

**الوصف:** تحديث حالة الطلب

**جسم الطلب:**
```json
{
  "status": "shipped"
}
```

**الحالات المتاحة:**
- `pending`: قيد الانتظار
- `confirmed`: مؤكد
- `shipped`: مرسل
- `delivered`: تم التسليم
- `cancelled`: ملغى
- `refunded`: استرجع

**الاستجابة الناجحة (200):**
```json
{
  "message": "تم تحديث حالة الطلب",
  "order": {
    "_id": "507f1f77bcf86cd799439015",
    "status": "shipped",
    "updatedAt": "2026-05-25T10:00:00Z"
  }
}
```

---

## 👥 المستخدمون

### جلب بيانات المستخدم (Get User Profile)

**المسار:** `GET /api/users/:userId`

**الوصف:** جلب بيانات مستخدم معين

**المعاملات:**
- `userId` (string, مطلوب): معرف المستخدم

**الاستجابة الناجحة (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "محمود أحمد",
  "email": "mahmoud@example.com",
  "phone": "0501234567",
  "role": "seller",
  "storeName": "متجري المميز",
  "storeDescription": "متجر متخصص في الإلكترونيات",
  "avatar": "https://example.com/avatar.jpg",
  "isVerified": true,
  "subscriptionPlan": "professional",
  "subscriptionExpire": "2026-06-24T21:55:00Z",
  "isActive": true,
  "accountBalance": 5000,
  "totalEarnings": 50000,
  "createdAt": "2026-05-20T00:00:00Z"
}
```

---

### تحديث بيانات المستخدم (Update User Profile)

**المسار:** `PUT /api/users/:userId`

**الوصف:** تحديث بيانات مستخدم معين

**جسم الطلب:**
```json
{
  "name": "محمود أحمد محمود",
  "phone": "0505555555",
  "storeName": "متجري المميز الجديد",
  "storeDescription": "متجر متخصص في الإلكترونيات والأجهزة",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**الاستجابة الناجحة (200):**
```json
{
  "message": "تم تحديث البيانات بنجاح",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "محمود أحمد محمود",
    "phone": "0505555555",
    "storeName": "متجري المميز الجديد",
    "updatedAt": "2026-05-25T10:00:00Z"
  }
}
```

---

### جلب جميع التجار (Get All Sellers)

**المسار:** `GET /api/users`

**الوصف:** جلب قائمة بجميع التجار

**الاستجابة الناجحة (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "محمود أحمد",
    "storeName": "متجري المميز",
    "avatar": "https://example.com/avatar.jpg",
    "subscriptionPlan": "professional",
    "isVerified": true,
    "createdAt": "2026-05-20T00:00:00Z"
  }
]
```

---

## 🔑 مفاتيح الخطأ الشائعة

| الكود | الرسالة | الحل |
|------|--------|------|
| 400 | يرجى ملء جميع الحقول المطلوبة | تحقق من جميع المتغيرات المطلوبة |
| 401 | التوكن غير صحيح | تأكد من التوكن وتجديده إذا انتهى |
| 404 | المورد غير موجود | تحقق من المعرف (ID) |
| 500 | خطأ في الخادم | حاول مرة أخرى لاحقاً |

---

## 💡 أفضل الممارسات

1. **استخدم HTTPS** في الإنتاج
2. **احفظ التوكن** بشكل آمن في Local Storage
3. **تجديد التوكن** قبل انتهاء صلاحيته
4. **تعامل مع الأخطاء** بشكل صحيح
5. **استخدم Pagination** للبيانات الكثيرة

---

**انتهى التوثيق - تم آخر تحديث: مايو 2026** ✅
