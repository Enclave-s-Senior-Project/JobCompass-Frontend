import { Country } from '@/types/common-types';

export const languagesData: Record<string, Country> = {
    China: {
        cities: [
            'Beijing',
            'Shanghai',
            'Guangzhou',
            'Shenzhen',
            'Chengdu',
            'Guangdong',
            'Sichuan',
            'Zhejiang',
            'Jiangsu',
            'Shandong',
        ],
        flag: '🇨🇳',
    },
    India: {
        cities: [
            'Mumbai',
            'Delhi',
            'Bangalore',
            'Kolkata',
            'Chennai',
            'Maharashtra',
            'Karnataka',
            'West Bengal',
            'Tamil Nadu',
            'Gujarat',
        ],
        flag: '🇮🇳',
    },
    Japan: {
        cities: ['Tokyo', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Aichi', 'Hokkaido', 'Kyoto'],
        flag: '🇯🇵',
    },
    'South Korea': {
        cities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Gwangju', 'Gyeonggi', 'Jeju'],
        flag: '🇰🇷',
    },
    //     cities: [
    //         'Jakarta',
    //         'Surabaya',
    //         'Bandung',
    //         'Medan',
    //         'Makassar',
    //         'East Java',
    //         'West Java',
    //         'North Sumatra',
    //         'South Sulawesi',
    //     ],
    //     flag: '🇮🇩',
    // },
    // Thailand: {
    //     cities: ['Bangkok', 'Chiang Mai', 'Pattaya', 'Phuket', 'Hat Yai', 'Chonburi', 'Songkhla', 'Krabi'],
    //     flag: '🇹🇭',
    // },
    Philippines: {
        cities: ['Manila', 'Davao', 'Cebu', 'Quezon City', 'Makati', 'Davao del Sur', 'Quezon', 'Bohol'],
        flag: '🇵🇭',
    },
    Vietnam: {
        cities: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Haiphong', 'Can Tho', 'Hue'],
        flag: '🇻🇳',
    },
    //     cities: ['Kuala Lumpur', 'Penang', 'Johor Bahru', 'Kota Kinabalu', 'Malacca', 'Selangor', 'Sabah', 'Sarawak'],
    //     flag: '🇲🇾',
    // },
    Singapore: {
        cities: ['Singapore', 'Jurong', 'Tampines', 'Woodlands', 'Sentosa'],
        flag: '🇸🇬',
    },
    //     cities: ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Punjab', 'Sindh', 'Khyber Pakhtunkhwa'],
    //     flag: '🇵🇰',
    // },
    // Bangladesh: {
    //     cities: ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal'],
    //     flag: '🇧🇩',
    // },
    // 'Sri Lanka': {
    //     cities: ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Western Province', 'Central Province'],
    //     flag: '🇱🇰',
    // },
    // Myanmar: {
    //     cities: ['Yangon', 'Mandalay', 'Naypyidaw', 'Bago', 'Mawlamyine', 'Shan State', 'Ayeyarwady'],
    //     flag: '🇲🇲',
    // },
    // Nepal: {
    //     cities: ['Kathmandu', 'Pokhara', 'Lalitpur', 'Biratnagar', 'Bharatpur', 'Bagmati', 'Gandaki'],
    //     flag: '🇳🇵',
    // },
    // 'United Arab Emirates': {
    //     cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
    //     flag: '🇦🇪',
    // },
    // 'Saudi Arabia': {
    //     cities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Eastern Province', 'Asir'],
    //     flag: '🇸🇦',
    // },
    // Turkey: {
    //     cities: ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Marmara', 'Aegean'],
    //     flag: '🇹🇷',
    // },
    // Nigeria: {
    //     cities: ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Lagos State', 'Ogun', 'Kaduna'],
    //     flag: '🇳🇬',
    // },
    // 'South Africa': {
    //     cities: [
    //         'Johannesburg',
    //         'Cape Town',
    //         'Durban',
    //         'Pretoria',
    //         'Bloemfontein',
    //         'Gauteng',
    //         'Western Cape',
    //         'KwaZulu-Natal',
    //     ],
    //     flag: '🇿🇦',
    // },
    // Egypt: {
    //     cities: ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Cairo Governorate', 'Alexandria Governorate'],
    //     flag: '🇪🇬',
    // },
    // Kenya: {
    //     cities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Nairobi County', 'Coast', 'Rift Valley'],
    //     flag: '🇰🇪',
    // },
    // Morocco: {
    //     cities: ['Casablanca', 'Marrakesh', 'Rabat', 'Fez', 'Tangier', 'Casablanca-Settat', 'Marrakesh-Safi'],
    //     flag: '🇲🇦',
    // },
    // Algeria: {
    //     cities: ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Algiers Province', 'Oran Province'],
    //     flag: '🇩🇿',
    // },
    // Ghana: {
    //     cities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Cape Coast', 'Greater Accra', 'Ashanti', 'Northern'],
    //     flag: '🇬🇭',
    // },
    // Uganda: {
    //     cities: ['Kampala', 'Gulu', 'Lira', 'Mbarara', 'Jinja', 'Central Region', 'Western Region'],
    //     flag: '🇺🇬',
    // },
    // Ethiopia: {
    //     cities: ['Addis Ababa', 'Dire Dawa', 'Bahir Dar', 'Mekelle', 'Adama', 'Oromia', 'Amhara'],
    //     flag: '🇪🇹',
    // },
    // Tunisia: {
    //     cities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Tunis Governorate', 'Sfax Governorate'],
    //     flag: '🇹🇳',
    // },
    // Sudan: {
    //     cities: ['Khartoum', 'Omdurman', 'Port Sudan', 'Kassala', 'Nyala', 'Khartoum State', 'Red Sea'],
    //     flag: '🇸🇩',
    // },
    // Zimbabwe: {
    //     cities: ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru', 'Harare Province', 'Matabeleland'],
    //     flag: '🇿🇼',
    // },
    // Angola: {
    //     cities: ['Luanda', 'Huambo', 'Lobito', 'Benguela', 'Cabinda', 'Luanda Province', 'Huila'],
    //     flag: '🇦🇴',
    // },
    // Cameroon: {
    //     cities: ['Yaoundé', 'Douala', 'Bamenda', 'Bafoussam', 'Garoua', 'Centre', 'Littoral'],
    //     flag: '🇨🇲',
    // },
    // "Côte d'Ivoire": {
    //     cities: ['Abidjan', 'Yamoussoukro', 'Bouaké', 'Daloa', 'San-Pédro', 'Abidjan District', 'Bas-Sassandra'],
    //     flag: '🇨🇮',
    // },
    // Madagascar: {
    //     cities: ['Antananarivo', 'Toamasina', 'Antsirabe', 'Fianarantsoa', 'Mahajanga', 'Analamanga', 'Atsinanana'],
    //     flag: '🇲🇬',
    // },
    'United Kingdom': {
        cities: [
            'London',
            'Manchester',
            'Birmingham',
            'Glasgow',
            'Edinburgh',
            'England',
            'Scotland',
            'Wales',
            'Northern Ireland',
        ],
        flag: '🇬🇧',
    },
    Germany: {
        cities: [
            'Berlin',
            'Munich',
            'Hamburg',
            'Cologne',
            'Frankfurt',
            'Bavaria',
            'North Rhine-Westphalia',
            'Baden-Württemberg',
        ],
        flag: '🇩🇪',
    },
    France: {
        cities: [
            'Paris',
            'Marseille',
            'Lyon',
            'Toulouse',
            'Nice',
            'Île-de-France',
            "Provence-Alpes-Côte d'Azur",
            'Auvergne-Rhône-Alpes',
        ],
        flag: '🇫🇷',
    },
    //     cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Venice', 'Lombardy', 'Lazio', 'Campania'],
    //     flag: '🇮🇹',
    // },
    // Spain: {
    //     cities: [
    //         'Madrid',
    //         'Barcelona',
    //         'Valencia',
    //         'Seville',
    //         'Bilbao',
    //         'Catalonia',
    //         'Andalusia',
    //         'Community of Madrid',
    //     ],
    //     flag: '🇪🇸',
    // },
    Russia: {
        cities: [
            'Moscow',
            'Saint Petersburg',
            'Novosibirsk',
            'Yekaterinburg',
            'Kazan',
            'Moscow Oblast',
            'Leningrad Oblast',
        ],
        flag: '🇷🇺',
    },
    //     cities: ['Warsaw', 'Kraków', 'Wrocław', 'Gdańsk', 'Łódź', 'Masovia', 'Lesser Poland', 'Silesia'],
    //     flag: '🇵🇱',
    // },
    // Ukraine: {
    //     cities: ['Kyiv', 'Kharkiv', 'Odesa', 'Dnipro', 'Lviv', 'Kyiv Oblast', 'Donetsk'],
    //     flag: '🇺🇦',
    // },
    // Netherlands: {
    //     cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'North Holland', 'South Holland'],
    //     flag: '🇳🇱',
    // },
    // Sweden: {
    //     cities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås', 'Stockholm County', 'Skåne'],
    //     flag: '🇸🇪',
    // },
    // Norway: {
    //     cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen', 'Oslo County', 'Vestland'],
    //     flag: '🇳🇴',
    // },
    // Portugal: {
    //     cities: ['Lisbon', 'Porto', 'Faro', 'Coimbra', 'Braga', 'Lisbon District', 'Porto District'],
    //     flag: '🇵🇹',
    // },
    // Greece: {
    //     cities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa', 'Attica', 'Central Macedonia'],
    //     flag: '🇬🇷',
    // },
    // Belgium: {
    //     cities: ['Brussels', 'Antwerp', 'Ghent', 'Liège', 'Bruges', 'Flanders', 'Wallonia'],
    //     flag: '🇧🇪',
    // },
    // Switzerland: {
    //     cities: ['Zurich', 'Geneva', 'Basel', 'Lausanne', 'Bern', 'Zurich Canton', 'Geneva Canton'],
    //     flag: '🇨🇭',
    // },
    // Austria: {
    //     cities: ['Vienna', 'Salzburg', 'Graz', 'Linz', 'Innsbruck', 'Tyrol', 'Upper Austria'],
    //     flag: '🇦🇹',
    // },
    // Australia: {
    //     cities: [
    //         'Sydney',
    //         'Melbourne',
    //         'Brisbane',
    //         'Perth',
    //         'Adelaide',
    //         'New South Wales',
    //         'Victoria',
    //         'Queensland',
    //         'Western Australia',
    //     ],
    //     flag: '🇦🇺',
    // },
    // 'New Zealand': {
    //     cities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Dunedin', 'Northland', 'Canterbury', 'Waikato'],
    //     flag: '🇳🇿',
    // },
    // 'Papua New Guinea': {
    //     cities: [
    //         'Port Moresby',
    //         'Lae',
    //         'Madang',
    //         'Mount Hagen',
    //         'Goroka',
    //         'National Capital District',
    //         'Morobe',
    //         'Eastern Highlands',
    //     ],
    //     flag: '🇵🇬',
    // },
    // Fiji: {
    //     cities: ['Suva', 'Nadi', 'Lautoka', 'Labasa', 'Ba', 'Central Division', 'Western Division'],
    //     flag: '🇫🇯',
    // },
    // 'Solomon Islands': {
    //     cities: ['Honiara', 'Gizo', 'Auki', 'Munda', 'Malaita', 'Guadalcanal', 'Western Province'],
    //     flag: '🇸🇧',
    // },
    // Vanuatu: {
    //     cities: ['Port Vila', 'Luganville', 'Isangel', 'Sola', 'Shefa', 'Sanma', 'Tafea'],
    //     flag: '🇻🇺',
    // },
    // Samoa: {
    //     cities: ['Apia', 'Salelologa', 'Asau', 'Falealupo', 'Upolu', "Savai'i"],
    //     flag: '🇼🇸',
    // },
    // Tonga: {
    //     cities: ["Nuku'alofa", 'Neiafu', 'Haveluloto', "Vava'u", 'Tongatapu'],
    //     flag: '🇹🇴',
    // },
    // Micronesia: {
    //     cities: ['Palikir', 'Weno', 'Kolonia', 'Tofol', 'Pohnpei', 'Chuuk', 'Kosrae'],
    //     flag: '🇫🇲',
    // },
    // 'Marshall Islands': {
    //     cities: ['Majuro', 'Ebeye', 'Jaluit', 'Wotje', 'Kwajalein'],
    //     flag: '🇲🇭',
    // },
    'United States': {
        cities: [
            'New York',
            'Los Angeles',
            'Chicago',
            'Houston',
            'Miami',
            'California',
            'Texas',
            'Florida',
            'New York State',
        ],
        flag: '🇺🇸',
    },
    Canada: {
        cities: [
            'Toronto',
            'Vancouver',
            'Montreal',
            'Calgary',
            'Ottawa',
            'Ontario',
            'British Columbia',
            'Quebec',
            'Alberta',
        ],
        flag: '🇨🇦',
    },
};
