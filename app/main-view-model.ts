import { Observable } from '@nativescript/core';

interface CharacterStats {
    guc: number;
    ceviklik: number;
    zeka: number;
    maxCan: number;
    maxMana: number;
    saldiriGucu: number;
    savunma: number;
}

export class GameViewModel extends Observable {
    private _karakterSecimEkrani: boolean = true;
    private _secilenIrk: string = '';
    private _secilenSinif: string = '';
    private _karakterAdi: string = '';
    private _sinif: string = '';
    private _karakterAvatar: string = '';
    private _can: number = 100;
    private _maxCan: number = 100;
    private _mana: number = 50;
    private _maxMana: number = 50;
    private _seviye: number = 1;
    private _tecrube: number = 0;
    private _maxTecrube: number = 100;
    private _altin: number = 50;
    private _iksirSayisi: number = 3;
    private _manaIksiriSayisi: number = 2;
    private _oyunMetni: string = '';
    private _mevcutSahne: string = '';
    private _sahneBilgisi: string = '';
    private _mevcutBolge: string = '';
    private _stats: CharacterStats = {
        guc: 0,
        ceviklik: 0,
        zeka: 0,
        maxCan: 0,
        maxMana: 0,
        saldiriGucu: 0,
        savunma: 0
    };

    constructor() {
        super();
        this.notifyPropertyChanges();
    }

    // Getter metodları
    get karakterSecimEkrani(): boolean { return this._karakterSecimEkrani; }
    get secilenIrk(): string { return this._secilenIrk; }
    get secilenSinif(): string { return this._secilenSinif; }
    get karakterAdi(): string { return this._karakterAdi; }
    set karakterAdi(value: string) {
        this._karakterAdi = value;
        this.notifyPropertyChange('karakterAdi', value);
    }
    get sinif(): string { return this._sinif; }
    get karakterAvatar(): string { return this._karakterAvatar; }
    get can(): number { return this._can; }
    get maxCan(): number { return this._maxCan; }
    get mana(): number { return this._mana; }
    get maxMana(): number { return this._maxMana; }
    get seviye(): number { return this._seviye; }
    get tecrube(): number { return this._tecrube; }
    get maxTecrube(): number { return this._maxTecrube; }
    get altin(): number { return this._altin; }
    get iksirSayisi(): number { return this._iksirSayisi; }
    get manaIksiriSayisi(): number { return this._manaIksiriSayisi; }
    get oyunMetni(): string { return this._oyunMetni; }
    get mevcutSahne(): string { return this._mevcutSahne; }
    get sahneBilgisi(): string { return this._sahneBilgisi; }

    // Karakter oluşturma metodları
    irkSec(args: any) {
        const irk = args.object.get('data-irk');
        this._secilenIrk = irk;
        this.notifyPropertyChange('secilenIrk', irk);
    }

    sinifSec(args: any) {
        const sinif = args.object.get('data-sinif');
        this._secilenSinif = sinif;
        this.notifyPropertyChange('secilenSinif', sinif);
        this.sinifStatlariAyarla(sinif);
    }

    private sinifStatlariAyarla(sinif: string) {
        switch(sinif) {
            case 'warrior':
                this._stats = {
                    guc: 10,
                    ceviklik: 6,
                    zeka: 4,
                    maxCan: 120,
                    maxMana: 40,
                    saldiriGucu: 12,
                    savunma: 8
                };
                break;
            case 'rogue':
                this._stats = {
                    guc: 6,
                    ceviklik: 10,
                    zeka: 4,
                    maxCan: 90,
                    maxMana: 50,
                    saldiriGucu: 10,
                    savunma: 5
                };
                break;
            case 'assassin':
                this._stats = {
                    guc: 5,
                    ceviklik: 9,
                    zeka: 6,
                    maxCan: 85,
                    maxMana: 60,
                    saldiriGucu: 11,
                    savunma: 4
                };
                break;
            case 'mage':
                this._stats = {
                    guc: 3,
                    ceviklik: 4,
                    zeka: 13,
                    maxCan: 70,
                    maxMana: 120,
                    saldiriGucu: 8,
                    savunma: 3
                };
                break;
            case 'priest':
                this._stats = {
                    guc: 4,
                    ceviklik: 3,
                    zeka: 13,
                    maxCan: 80,
                    maxMana: 100,
                    saldiriGucu: 7,
                    savunma: 4
                };
                break;
        }
    }

    karakterOlustur() {
        if (!this._secilenIrk || !this._secilenSinif || !this._karakterAdi) {
            this._oyunMetni = "Lütfen tüm seçimleri yapın ve bir isim girin!";
            this.notifyPropertyChange('oyunMetni', this._oyunMetni);
            return;
        }

        // Karakter özelliklerini ayarla
        this._sinif = this.sinifAdiCevir(this._secilenSinif);
        this._karakterAvatar = `~/assets/${this._secilenIrk}-${this._secilenSinif}.png`;
        this._maxCan = this._stats.maxCan;
        this._can = this._maxCan;
        this._maxMana = this._stats.maxMana;
        this._mana = this._maxMana;

        // Başlangıç sahnesini ayarla
        this._mevcutBolge = this._secilenIrk === 'insan' ? 'El Morad' : 'Luferson';
        this._mevcutSahne = `~/assets/scenes/${this._mevcutBolge.toLowerCase()}-gate.png`;
        this._sahneBilgisi = this.baslangicSahneBilgisiOlustur();
        this._oyunMetni = this.baslangicHikayesiOlustur();

        // Karakter seçim ekranını kapat
        this._karakterSecimEkrani = false;
        this.notifyPropertyChanges();

        // İlk görevi göster
        setTimeout(() => {
            this.oyunAkisiniBaslat();
        }, 3000);
    }

    // Oyun akışını başlat
    oyunAkisiniBaslat() {
        if (this._karakterSecimEkrani) return;

        // İlk görevi göster
        this._oyunMetni = this._secilenIrk === 'insan' ? 
            "Görev: El Morad'ın savunmasını güçlendirmek için malzeme toplamalısın. Kuzey surlarına git ve nöbetçilerle konuş." :
            "Görev: Luferson'un savunmasını güçlendirmek için malzeme toplamalısın. Doğu kulelerine git ve gözcülerle konuş.";
        this.notifyPropertyChange('oyunMetni', this._oyunMetni);
    }

    private sinifAdiCevir(sinif: string): string {
        const siniflar = {
            'warrior': 'Savaşçı',
            'rogue': 'Haydut',
            'assassin': 'Suikastçı',
            'mage': 'Büyücü',
            'priest': 'Rahip'
        };
        return siniflar[sinif] || sinif;
    }

    private baslangicSahneBilgisiOlustur(): string {
        if (this._secilenIrk === 'insan') {
            return "El Morad'ın muhteşem kapıları önünde duruyorsun. Güneş batmak üzere...";
        } else {
            return "Luferson Kalesi'nin heybetli duvarları karşında yükseliyor. Kar taneleri yüzüne çarpıyor...";
        }
    }

    private baslangicHikayesiOlustur(): string {
        if (this._secilenIrk === 'insan') {
            return `El Morad'ın kapılarında duruyorsun. Karanlık güçlere karşı insanlığı korumak için and içtin...

Uzun yıllar süren savaşın ardından, şehir hala ayakta. Ancak Tuareklerin tehdidi her zamankinden daha büyük. Kuzeyden gelen haberler hiç iç açıcı değil.

Görevini iyi biliyorsun: El Morad'ı ve insanlığı korumak. Logos'un kutsal ışığı seninle olsun, ${this._sinif}.`;
        } else {
            return `Luferson Kalesi'nin kapılarında duruyorsun. İnsanların zulmünden kaçan halkına umut olmak için yemin ettin...

Yıllardır süren sürgün ve acıların ardından, artık güçlü bir sığınağınız var. El Morad'ın baskısı devam ediyor, ama artık eskisi kadar güçsüz değilsiniz.

Amacın net: Tuarek halkını korumak ve özgürlüklerini kazanmak. Akara'nın gölgesi üzerinde olsun, ${this._sinif}.`;
        }
    }

    // Oyun aksiyonları
    saldir() {
        if (this._can <= 0) {
            this._oyunMetni = "Savaşamayacak kadar yaralısın...";
            return;
        }

        const hasar = Math.floor(Math.random() * this._stats.saldiriGucu) + this._stats.guc;
        this._can = Math.max(0, this._can - Math.floor(Math.random() * 15));
        this._tecrube += Math.floor(hasar / 2);
        
        const saldiriMetinleri = [
            `${this.silahMetniOlustur()} Düşman ${hasar} hasar aldı.`,
            `Keskin bir saldırı! ${hasar} hasar verdin.`,
            `Güçlü bir vuruş! Düşman ${hasar} hasar aldı.`,
            `${this._secilenIrk === 'insan' ? "Logos'un" : "Akara'nın"} gücüyle vurdun! ${hasar} hasar verdin.`
        ];
        
        this._oyunMetni = saldiriMetinleri[Math.floor(Math.random() * saldiriMetinleri.length)];
        this.seviyeKontrol();
        this.notifyPropertyChanges();
    }

    private silahMetniOlustur(): string {
        const sinifSilahlari = {
            'warrior': 'Kılıcını ustalıkla savurdun!',
            'rogue': 'Hançerini hedefine sapladın!',
            'assassin': 'Gölgelerden saldırdın!',
            'mage': 'Asa\'nı düşmana doğrulttun!',
            'priest': 'Kutsal asanı kaldırdın!'
        };
        return sinifSilahlari[this._secilenSinif] || 'Saldırdın!';
    }

    buyuKullan() {
        if (this._mana < 15) {
            this._oyunMetni = "Yeterli manan yok! Mana iksiri kullanmayı dene.";
            return;
        }

        const hasar = Math.floor(Math.random() * (this._stats.zeka * 2)) + this._stats.zeka;
        this._mana -= 15;
        this._tecrube += Math.floor(hasar / 2);

        const buyuMetinleri = this.buyuMetniOlustur(hasar);
        this._oyunMetni = buyuMetinleri[Math.floor(Math.random() * buyuMetinleri.length)];
        this.seviyeKontrol();
        this.notifyPropertyChanges();
    }

    private buyuMetniOlustur(hasar: number): string[] {
        const sinifBuyuleri = {
            'warrior': [
                `Savaş çığlığın düşmanı sarstı! ${hasar} hasar verdin.`,
                `Kılıcını kutsal güçle doldurdun! ${hasar} hasar verdin.`
            ],
            'rogue': [
                `Zehirli bir ok fırlattın! ${hasar} hasar verdin.`,
                `Gölge büyüsü kullandın! ${hasar} hasar verdin.`
            ],
            'assassin': [
                `Karanlık sanatları kullandın! ${hasar} hasar verdin.`,
                `Ölümcül bir gölge büyüsü! ${hasar} hasar verdin.`
            ],
            'mage': [
                `Ateş topu büyüsü kullandın! ${hasar} hasar verdin.`,
                `Yıldırım çağırdın! ${hasar} hasar verdin.`
            ],
            'priest': [
                `Kutsal ışık büyüsü kullandın! ${hasar} hasar verdin.`,
                `İlahi güç düşmanı kavurdu! ${hasar} hasar verdin.`
            ]
        };
        return sinifBuyuleri[this._secilenSinif] || [`Büyü kullandın! ${hasar} hasar verdin.`];
    }

    iksirKullan() {
        if (this._iksirSayisi <= 0) {
            this._oyunMetni = "Hiç iksirin kalmadı! Şehre dönüp yeni iksirler almalısın.";
            return;
        }

        const iyilesme = Math.floor(Math.random() * 30) + 30;
        this._can = Math.min(this._maxCan, this._can + iyilesme);
        this._iksirSayisi--;

        const iksirMetinleri = [
            `İyileştirici iksir kullandın ve ${iyilesme} can yeniledin!`,
            `Kırmızı iksiri içtin! ${iyilesme} can yenilendi.`,
            `İksirin etkisiyle yaralarının iyileştiğini hissediyorsun. ${iyilesme} can yenilendi.`,
            `Şifa iksiri etkili oldu! ${iyilesme} can kazandın.`
        ];

        this._oyunMetni = iksirMetinleri[Math.floor(Math.random() * iksirMetinleri.length)];
        this.notifyPropertyChanges();
    }

    gorevGoster() {
        const gorevMetni = this._secilenIrk === 'insan' ? this.insanGorevleriniGoster() : this.tuarekGorevleriniGoster();
        this._oyunMetni = gorevMetni;
        this.notifyPropertyChanges();
    }

    private insanGorevleriniGoster(): string {
        return `Aktif Görevler:

1. El Morad'ın Savunması (Ana Görev)
   - Şehrin savunmasını güçlendirmek için malzeme topla (0/5)
   - Kuzey surlarındaki nöbetçilerle konuş
   - Tuarek casuslarını bul

2. Logos'un Işığı (Yan Görev)
   - Kutsal mabetten yeni büyüler öğren
   - Şifa büyüsü için gereken malzemeleri topla (2/3)

3. Kayıp Şövalye (Yan Görev)
   - Karanlık Orman'da kaybolan şövalyeyi bul
   - Şövalyenin son görüldüğü yeri araştır`;
    }

    private tuarekGorevleriniGoster(): string {
        return `Aktif Görevler:

1. Luferson'un Gücü (Ana Görev)
   - Kalenin savunmasını güçlendirmek için malzeme topla (0/5)
   - Doğu kulelerindeki gözcülerle konuş
   - El Morad casuslarını yakala

2. Akara'nın Lütfu (Yan Görev)
   - Karanlık tapınaktan yeni büyüler öğren
   - Kara büyü için gereken malzemeleri topla (1/3)

3. Kayıp Kabile (Yan Görev)
   - Eslant Dağları'nda kaybolan kabile üyelerini bul
   - Son görüldükleri mağarayı araştır`;
    }

    envaterGoster() {
        const envanterMetni = `Envanter:

Ekipman:
${this.sinifaGoreEkipmanGoster()}

Tüketilebilir:
- ${this._altin} Altın
- ${this._iksirSayisi} İyileştirme İksiri
- ${this._manaIksiriSayisi} Mana İksiri

Malzemeler:
- 2x ${this._secilenIrk === 'insan' ? 'Kutsal Kristal' : 'Karanlık Kristal'}
- 1x Ejderha Pulu
- 3x Demir Cevheri`;

        this._oyunMetni = envanterMetni;
        this.notifyPropertyChanges();
    }

    private sinifaGoreEkipmanGoster(): string {
        const sinifEkipmanlari = {
            'warrior': '- Çelik Kılıç (+5 Saldırı)\n- Zincir Zırh (+10 Savunma)\n- Şövalye Kalkanı (+5 Savunma)',
            'rogue': '- Çift Hançer (+4 Saldırı)\n- Deri Zırh (+6 Savunma)\n- Gölge Pelerini (+3 Gizlenme)',
            'assassin': '- Zehirli Kama (+6 Saldırı)\n- Gölge Zırhı (+5 Savunma)\n- Karanlık Maske (+4 Gizlenme)',
            'mage': '- Büyücü Asası (+7 Büyü Gücü)\n- Cüppe (+4 Savunma)\n- Büyü Kitabı (+5 Mana)',
            'priest': '- Kutsal Asa (+6 Büyü Gücü)\n- Rahip Cübbesi (+5 Savunma)\n- Kutsal Kolye (+6 İyileştirme)'
        };
        return sinifEkipmanlari[this._secilenSinif] || '- Temel Ekipman';
    }

    haritaGoster() {
        const haritaMetni = this._secilenIrk === 'insan' ? this.insanHaritasiniGoster() : this.tuarekHaritasiniGoster();
        this._oyunMetni = haritaMetni;
        this.notifyPropertyChanges();
    }

    private insanHaritasiniGoster(): string {
        return `Bölgeler:

1. El Morad Kalesi (Mevcut Konum)
   - Güvenli Bölge
   - Tüccarlar ve Zanaatkarlar
   - Şövalye Eğitim Alanı

2. Karanlık Orman
   - Tehlike Seviyesi: Orta
   - Tuarek Kampları
   - Nadir Malzemeler

3. Eslant Dağları
   - Tehlike Seviyesi: Yüksek
   - Antik Tapınaklar
   - Ejderha Yuvaları

4. Luferson Kalesi
   - Tehlike Seviyesi: Çok Yüksek
   - Tuarek Kalesi
   - Kara Büyü Merkezi`;
    }

    private tuarekHaritasiniGoster(): string {
        return `Bölgeler:

1. Luferson Kalesi (Mevcut Konum)
   - Güvenli Bölge
   - Kara Pazar
   - Tuarek Eğitim Alanı

2. Eslant Dağları
   - Tehlike Seviyesi: Orta
   - Gizli Geçitler
   - Nadir Malzemeler

3. Karanlık Orman
   - Tehlike Seviyesi: Yüksek
   - İnsan Devriyeler
   - Antik Kalıntılar

4. El Morad
   - Tehlike Seviyesi: Çok Yüksek
   - İnsan Kalesi
   - Işık Tapınağı`;
    }

    private seviyeKontrol() {
        if (this._tecrube >= this._maxTecrube) {
            this._seviye++;
            this._tecrube = 0;
            this._maxTecrube = Math.floor(this._maxTecrube * 1.5);
            this._maxCan += 20;
            this._maxMana += 10;
            this._can = this._maxCan;
            this._mana = this._maxMana;
            
            const seviyeMetinleri = [
                `Tebrikler! Seviye ${this._seviye}'e ulaştın!\nGücünün arttığını hissediyorsun.`,
                `${this._secilenIrk === 'insan' ? "Logos'un" : "Akara'nın"} kutsamasıyla seviye ${this._seviye}'e yükseldin!\nYeni yetenekler açıldı.`,
                `Tecrüben arttı! Artık seviye ${this._seviye}'desin.\nDaha güçlü bir ${this._sinif} oldun.`
            ];
            
            this._oyunMetni = seviyeMetinleri[Math.floor(Math.random() * seviyeMetinleri.length)];
        }
    }

    private notifyPropertyChanges() {
        this.notifyPropertyChange('karakterSecimEkrani', this._karakterSecimEkrani);
        this.notifyPropertyChange('secilenIrk', this._secilenIrk);
        this.notifyPropertyChange('secilenSinif', this._secilenSinif);
        this.notifyPropertyChange('karakterAdi', this._karakterAdi);
        this.notifyPropertyChange('sinif', this._sinif);
        this.notifyPropertyChange('karakterAvatar', this._karakterAvatar);
        this.notifyPropertyChange('can', this._can);
        this.notifyPropertyChange('maxCan', this._maxCan);
        this.notifyPropertyChange('mana', this._mana);
        this.notifyPropertyChange('maxMana', this._maxMana);
        this.notifyPropertyChange('seviye', this._seviye);
        this.notifyPropertyChange('tecrube', this._tecrube);
        this.notifyPropertyChange('maxTecrube', this._maxTecrube);
        this.notifyPropertyChange('altin', this._altin);
        this.notifyPropertyChange('iksirSayisi', this._iksirSayisi);
        this.notifyPropertyChange('manaIksiriSayisi', this._manaIksiriSayisi);
        this.notifyPropertyChange('oyunMetni', this._oyunMetni);
        this.notifyPropertyChange('mevcutSahne', this._mevcutSahne);
        this.notifyPropertyChange('sahneBilgisi', this._sahneBilgisi);
    }
}