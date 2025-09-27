import React from "react";

export type Service = {
  slug: string;
  title: string;
  longDescription: (className?: string) => React.JSX.Element;
  description: string;
  images: string[];
};

const servicesData: Service[] = [
  // Baris 1
  {
    slug: 'pagar-besi',
    title: 'Pagar Besi',
    longDescription: (className?: string) => (
      <div>
        <p className={className}>
          Kami membuat atau melakukan instalasi pagar besi sesuai dengan pemesanan/permintaan pelanggan. Desain minimalis dan modern untuk keamanan dan estetika properti Anda. Pelanggan juga dapat memilih berbagai model dan finishing cat sesuai keinginan. Proses pemasangan nantinya akan dilakukan oleh tim kami sesuai dengan kesepakatan waktu dan tempat yang telah ditentukan.
        </p>
        <p className={className}>
          Kami menerima pemesanan pagar besi untuk rumah, kantor, sekolah, dan area komersial lainnya. Kami beroperasi di wilayah Yogyakarta dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
        </p>
      </div>
    ),
    description: 'Kami membuat dan memasang pagar besi minimalis dan modern untuk keamanan dan keindahan properti Anda. Material kuat dan tahan lama.',
    images: ['/produk/pagarBesi1.png', '/produk/pagarBesi2.jpeg', '/produk/pagarBesi3.jpeg'],
  },
  {
    slug: 'kanopi',
    title: 'Kanopi (Canopy)',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Pemasangan kanopi baja ringan dengan berbagai pilihan atap (spandek, polikarikarbonat, plat seng, dll) untuk melindungi carport atau teras Anda dari cuaca. Desain yang kami gunakan bisa custom sesuai kebutuhan dan gaya arsitektur rumah. Kami juga menyediakan opsi finishing cat yang tahan cuaca untuk memperpanjang umur kanopi Anda. Proses pemasangan nantinya akan dilakukan oleh tim profesional kami sesuai dengan kesepakatan waktu dan tempat yang telah ditentukan.
          </p>
          <p className={className}>
            Kami melayani pemasangan kanopi di wilayah Yogyakarta dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>
        </div>
      );
    },
    description: 'Pemasangan kanopi baja ringan dengan berbagai pilihan atap untuk melindungi carport atau teras Anda dari cuaca.',
    images: ['/produk/kanopi.jpeg', '/produk/kanopi1.jpeg', '/produk/kanopi2.jpg', '/produk/kanopi3.jpg'],
  },
  {
    slug: 'folding-gate',
    title: 'Folding Gate',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Kami menyediakan solusi pintu folding gate yang praktis dan aman untuk ruko, garasi, atau gudang Anda. Folding gate kami terbuat dari material besi berkualitas tinggi dengan berbagai pilihan ketebalan slat dan warna sesuai preferensi pelanggan. Desain dan segala kebutuhan dapat kami sesuaikan ke setiap tempat area pemasangan. Proses pemasangan akan dilakukan oleh tim ahli kami sesuai dengan kesepakatan waktu dan tempat yang telah ditentukan.
          </p>
          <p className={className}>
            Kami melayani pemasangan folding gate di wilayah Yogyakarta (Jogja) dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>
        </div>
      );
    },
    description: 'Solusi pintu praktis dan aman untuk ruko, garasi, dan gudang Anda. Tersedia dalam berbagai ketebalan slat dan warna sesuai preferensi.',
    images: ['/produk/foldingGate.jpeg', '/produk/foldingGate2.jpg', '/produk/foldingGate3.jpg'],
  },
  {
    slug: 'rolling-door',
    title: 'Rolling Door',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Kami dapat membuat atau melakukan instalasi rolling door sesuai dengan kebutuhan pelanggan. Tersedia dalam berbagai pilihan model, mulai dari rolling door industrial untuk area komersial hingga rolling door untuk kios kecil. Pelanggan juga dapat memilih berbagai opsi finishing cat sesuai keinginan. Proses pemasangan akan dilakukan oleh tim profesional kami sesuai dengan kesepakatan waktu dan tempat yang telah ditentukan.
          </p>
          <p className={className}>
            Kami melayani pemasangan rolling door di wilayah Yogyakarta (Jogja) dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>
        </div>
      );
    },
    description: 'Menyediakan rolling door industrial maupun untuk kios dengan material berkualitas yang mendukung keamanan dan kemudahan akses.',
    images: ['/produk/rollingDoor1.jpg', '/produk/rollingDoor2.png', '/produk/rollingDoor3.jpg', '/produk/rollingDoor4.jpg'],
  },
  {
    slug: 'balkon',
    title: 'Balkon (Balcon)',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Kami menyediakan jasa pembuatan dan pemasangan railing balkon yang kokoh dan estetik. Railing balkon kami dapat disesuaikan dengan desain minimalis atau kustom sesuai dengan arsitektur bangunan dan preferensi pelanggan. Material yang kami gunakan berkualitas tinggi untuk memastikan keamanan dan daya tahan railing. Proses pemasangan akan dilakukan oleh tim ahli kami sesuai dengan kesepakatan waktu dan tempat yang telah ditentukan.
          </p>
          <p className={className}>
            Kami melayani pemasangan railing balkon di wilayah Yogyakarta (Jogja) dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>
        </div>
      );
    },
    description: 'Pembuatan dan pemasangan/instalasi railing balkon yang kokoh dan estetik, dengan desain minimalis atau kustom sesuai arsitektur bangunan dan preferensi pelanggan.',
    images: ['/produk/balkon1.avif', '/produk/balkon2.jpg', '/produk/balkon3.jpg'],
  },
  {
    slug: 'etalase-kaca',
    title: 'Etalase Kaca',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Kami menyediakan jasa pembuatan etalase kaca dengan rangka aluminium atau besi sesuai kebutuhan pelanggan. Etalase kaca kami dirancang untuk menampilkan produk Anda dengan presisi dan tampilan modern, cocok untuk toko, konter, atau pameran. Pelanggan dapat memilih berbagai opsi desain dan finishing cat sesuai keinginan. Proses pemasangan akan dilakukan oleh tim profesional kami sesuai dengan kesepakatan waktu dan tempat yang telah ditentukan.
          </p>
          <p className={className}>
            Kami melayani pembuatan dan pemasangan etalase kaca di wilayah Yogyakarta (Jogja) dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>
        </div>
      );
    },
    description: 'Pembuatan etalase kaca dengan rangka aluminium atau besi untuk display produk toko, konter, atau pameran dengan presisi dan tampilan modern.',
    images: ['/produk/etalaseKaca1.jpg', '/produk/etalaseKaca2.jpg', '/produk/etalaseKaca3.jpg'],
  },
  {
    slug: 'tenda',
    title: 'Tenda',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Kami menyediakan jasa pembuatan rangka tenda besi yang kokoh dan tahan lama untuk berbagai keperluan acara, pameran, atau pedagang kaki lima. Rangka tenda kami dirancang untuk kemudahan pemasangan dan pembongkaran, serta dapat disesuaikan dengan ukuran dan desain yang diinginkan pelanggan. Material besi yang kami gunakan berkualitas tinggi untuk memastikan kekuatan dan ketahanan tenda dalam berbagai kondisi cuaca.
          </p>
          <p className={className}>
            Kami melayani pembuatan rangka tenda di wilayah Yogyakarta (Jogja) dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>
        </div>
      );
    },
    description: 'Pembuatan rangka tenda yang kokoh untuk berbagai keperluan acara, pameran, atau pedagang kaki lima. Kami pastikan kuat, awet, dan mudah dibongkar pasang.',
    images: ['/produk/tenda1.jpeg', '/produk/tenda2.jpg', '/produk/tenda3.png'],
  },
  {
    slug: 'teralis',
    title: 'Teralis',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Kami menyediakan jasa pembuatan dan pemasangan teralis jendela dan pintu untuk meningkatkan keamanan hunian (rumah) Anda tanpa mengurangi estetika. Teralis yang kami buat tersedia dalam berbagai motif sesuai dengan preferensi pelanggan, mulai dari desain minimalis hingga yang lebih artistik. Material besi berkualitas tinggi yang kami gunakan memastikan daya tahan dan keamanan optimal. Proses pemasangan akan dilakukan oleh tim profesional kami sesuai dengan kesepakatan waktu dan tempat yang telah ditentukan.
          </p>
          <p className={className}>
            Kami melayani pembuatan dan pemasangan teralis di wilayah Yogyakarta (Jogja) dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>

        </div>
      );
    },
    description: 'Pembuatan atau pemasangan teralis jendela dan pintu untuk meningkatkan keamanan hunian (rumah) Anda tanpa mengurangi estetika. Layanan ini tersedia dalam berbagai motif sesuai dengan preferensi pelanggan.',
    images: ['/produk/teralis1.jpg', '/produk/teralis2.jpg', '/produk/teralis3.webp', '/produk/teralis4.jpg', '/produk/teralis5.webp'],
  },
  {
    slug: 'railing-tangga',
    title: 'Railing Tangga',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Kami menyediakan jasa pembuatan dan pemasangan railing tangga besi yang fungsional dan estetis. Railing tangga kami dirancang untuk memberikan keamanan saat naik turun tangga, sekaligus menambah nilai artistik pada interior rumah atau bangunan Anda. Pelanggan dapat memilih berbagai desain dan finishing cat sesuai dengan gaya arsitektur dan preferensi pribadi. Material besi berkualitas tinggi yang kami gunakan memastikan kekuatan dan daya tahan railing. Proses pemasangan akan dilakukan oleh tim profesional kami sesuai dengan kesepakatan waktu dan tempat yang telah ditentukan.
          </p>
          <p className={className}>
            Kami melayani pembuatan dan pemasangan railing tangga di wilayah Yogyakarta (Jogja) dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>
        </div>
      );
    },
    description: 'Membuat railing tangga besi dari bahan stainless steel yang fungsional dan elegan, memberikan keamanan sekaligus sentuhan artistik pada interior pada tangga Anda.',
    images: ['/produk/tanggaBesi.jpeg', '/produk/railingTangga1.webp', '/produk/railingTangga2.png', '/produk/railingTangga3.webp'],
  },
  {
    slug: 'reklame',
    title: 'Reklame',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Kami menyediakan jasa pembuatan dan desain rangka papan reklame atau billboard dari besi atau material lain yang kokoh dan aman untuk promosi jangka panjang bisnis Anda di ruang outdoor. Rangka reklame kami dapat disesuaikan dengan berbagai ukuran dan desain sesuai kebutuhan branding dan pemasaran Anda. Proses pembuatan dilakukan oleh tim profesional kami dengan standar kualitas tinggi untuk memastikan ketahanan terhadap cuaca dan kondisi lingkungan.
          </p>
          <p className={className}>
            Kami melayani pembuatan rangka reklame di wilayah Yogyakarta (Jogja) dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>
        </div>
      );
    },
    description: 'Pembuatan dan desain rangka papan reklame atau billboard dari besi atau material lain yang kokoh dan aman untuk promosi jangka panjang bisnis Anda di ruang outdoor.',
    images: ['/produk/reklame1.jpeg', '/produk/reklame2.webp', '/produk/reklame3.jpg', '/produk/reklame4.webp'],
  },
  {
    slug: 'huruf-timbul',
    title: 'Huruf Timbul',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Kami menyediakan jasa pembuatan dan desain huruf timbul (letter sign) dari bahan galvanis atau stainless untuk identitas bisnis seperti toko, kantor, atau kafe. Huruf timbul yang kami buat dirancang untuk memberikan tampilan yang elegan dan profesional, serta tahan terhadap berbagai kondisi cuaca. Pelanggan dapat memilih berbagai jenis font, ukuran, dan finishing cat sesuai dengan branding dan estetika bisnis mereka. Proses pemasangan akan dilakukan oleh tim ahli kami sesuai dengan kesepakatan waktu dan tempat yang telah ditentukan.
          </p>
          <p className={className}>
            Kami melayani pembuatan dan pemasangan huruf timbul di wilayah Yogyakarta (Jogja) dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>
        </div>
      );
    },
    description: 'Pembuatan dan desain huruf timbul (letter sign) dari bahan galvanis atau stainless untuk identitas bisnis seperti toko, kantor, atau kafe, atau nama daerah yang elegan dan profesional.',
    images: ['/produk/hurufTimbul.jpeg', '/produk/hurufTimbul2.jpg', '/produk/hurufTimbul3.jpg'],
  },
  {
    slug: 'meja-kursi',
    title: 'Meja atau Kursi',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Kami menyediakan jasa pembuatan meja custom dengan kaki besi hollow yang kuat dan awet, cocok untuk berbagai kebutuhan seperti meja kafe, meja kerja, atau meja makan dengan desain industrial yang minimalis. Pelanggan dapat memilih berbagai ukuran, bentuk, dan finishing cat sesuai dengan gaya interior dan preferensi pribadi. Material besi hollow yang kami gunakan memastikan stabilitas dan daya tahan meja dalam penggunaan sehari-hari.
          </p>
          <p className={className}>
            Kami melayani pembuatan meja custom di wilayah Yogyakarta (Jogja) dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>
        </div>
      );
    },
    description: 'Jasa las untuk pembuatan meja custom dengan kaki besi, seperti meja kafe, meja kerja, atau meja makan dengan desain industrial yang kokoh dan awet.',
    images: ['/produk/Meja-Cafe.jpg', '/produk/mejaKursi1.jpg', '/produk/mejaKursi2.png', '/produk/mejaKursi3.jpg', '/produk/mejaKursi4.jpg', '/produk/mejaKursi5.jpg'],
  },
  {
    slug: 'mainan-tk',
    title: 'Mainan TK',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Kami menyediakan jasa pembuatan mainan outdoor untuk taman kanak-kanak (TK) seperti ayunan, perosotan, dan panjatan yang dirancang dengan rangka besi yang aman, higienis, dan dicat dengan warna menarik. Mainan kami dibuat sesuai standar keselamatan anak-anak dan dapat disesuaikan dengan kebutuhan ruang bermain di sekolah atau taman. Material besi yang kami gunakan berkualitas tinggi untuk memastikan kekuatan dan daya tahan mainan dalam penggunaan jangka panjang.
          </p>
          <p className={className}>
            Kami melayani pembuatan mainan TK di wilayah Yogyakarta (Jogja) dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>
        </div>
      );
    },
    description: 'Pembuatan mainan outdoor untuk taman kanak-kanak seperti ayunan, perosotan, dan panjatan dengan rangka besi yang aman, higienis, dan dicat dengan warna menarik.',
    images: ['/produk/mainanTk1.jpg', '/produk/mainanTk2.jpg', '/produk/mainanTk3.png', '/produk/mainanTk4.jpg', '/produk/mainanTk5.jpg'],
  },
  {
    slug: 'tempat-tidur',
    title: 'Tempat Tidur',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Kami menyediakan jasa pembuatan ranjang besi hollow yang kuat dan awet dengan desain minimalis dan modern, cocok untuk kamar tidur anak-anak maupun dewasa. Ranjang besi yang kami buat dirancang untuk memberikan kenyamanan tidur sekaligus estetika pada interior kamar Anda. Pelanggan dapat memilih berbagai ukuran dan finishing cat sesuai dengan preferensi pribadi. Material besi hollow yang kami gunakan memastikan stabilitas dan daya tahan ranjang dalam penggunaan sehari-hari.
          </p>
          <p className={className}>
            Kami melayani pembuatan ranjang besi di wilayah Yogyakarta (Jogja) dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>
        </div>
      );
    },
    description: 'Membuat atau mendesain rangka tempat tidur atau ranjang tingkat dari besi hollow yang kuat, awet, dan tidak mudah reyot dengan desain minimalis dan modern.',
    images: ['/produk/ranjang1.jpg', '/produk/ranjang2.jpg', '/produk/ranjang3.jpg'],
  },
  {
    slug: 'plafond-besi',
    title: 'Plafond (Besi)',
    longDescription: (className?: string) => {
      return (
        <div>
          <p className={className}>
            Kami menyediakan jasa desain dan pembuatan rangka plafond gantung (drop ceiling) menggunakan material besi hollow yang presisi dan kuat untuk interior bangunan. Rangka plafond besi yang kami buat dapat disesuaikan dengan berbagai desain dan ukuran sesuai kebutuhan estetika dan fungsional ruangan Anda. Material besi hollow yang kami gunakan memastikan kestabilan dan daya tahan plafond dalam jangka panjang. Proses pemasangan akan dilakukan oleh tim profesional kami sesuai dengan kesepakatan waktu dan tempat yang telah ditentukan.
          </p>
          <p className={className}>
            Kami melayani pembuatan dan pemasangan rangka plafond besi di wilayah Yogyakarta (Jogja) dan sekitarnya. Untuk informasi lebih lanjut atau konsultasi gratis, silakan hubungi kami melalui kontak yang tersedia di website ini.
          </p>
        </div>
      );
    },
    description: 'Desain dan pembuatan rangka plafond gantung (drop ceiling) menggunakan material besi hollow yang presisi dan kuat untuk interior bangunan.',
    images: ['/produk/plafon1.jpeg', '/produk/plafon2.jpg', '/produk/plafon3.webp', '/produk/plafon4.jpg', '/produk/plafon5.jpg'],
  },
];

export default servicesData;