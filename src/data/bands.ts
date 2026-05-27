export type BandCategory =
  | 'amateur'
  | 'broadcast'
  | 'aeronautical'
  | 'maritime'
  | 'military'
  | 'satellite'
  | 'cellular'
  | 'ism'
  | 'navigation'
  | 'science'
  | 'other'

export interface SpectrumBand {
  id: string
  name: string
  startFreq: number
  endFreq: number
  category: BandCategory
  description: string
  uses: string[]
  color?: string
}

export interface SpectrumSection {
  id: string
  name: string
  shortName: string
  startFreq: number
  endFreq: number
  description: string
  bands: SpectrumBand[]
}

export const CATEGORY_COLORS: Record<BandCategory, string> = {
  amateur: '#00d4aa',
  broadcast: '#ff6b35',
  aeronautical: '#4d9de0',
  maritime: '#1a7fba',
  military: '#e84855',
  satellite: '#b07dff',
  cellular: '#f0a030',
  ism: '#3bc9db',
  navigation: '#f06595',
  science: '#51cf66',
  other: '#868e96',
}

export const CATEGORY_LABELS: Record<BandCategory, string> = {
  amateur: 'Amateur Radio',
  broadcast: 'Broadcast',
  aeronautical: 'Aeronautical',
  maritime: 'Maritime',
  military: 'Military / Government',
  satellite: 'Satellite',
  cellular: 'Cellular / Mobile',
  ism: 'ISM / Wi-Fi / Bluetooth',
  navigation: 'Navigation',
  science: 'Science / Radio Astronomy',
  other: 'Other',
}

const vlfBands: SpectrumBand[] = [
  {
    id: 'vlf-time',
    name: 'Time Signal Stations',
    startFreq: 0.003,
    endFreq: 0.03,
    category: 'navigation',
    description: 'Very Low Frequency band used for time signal broadcasts and navigation. These signals can penetrate deep seawater, making them valuable for submarine communication.',
    uses: ['Time signal distribution (WWVB, MSF)', 'Submarine communication', 'Navigation (OMEGA, Alpha)'],
  },
  {
    id: 'vlf-navaid',
    name: 'Navigation Aids',
    startFreq: 0.01,
    endFreq: 0.014,
    category: 'navigation',
    description: 'Long-range radio navigation systems operating in the VLF range, providing positioning information over vast distances.',
    uses: ['Long-range navigation', 'Aviation backup systems'],
  },
]

const lfBands: SpectrumBand[] = [
  {
    id: 'lf-nav',
    name: 'LORAN / Navigation',
    startFreq: 0.09,
    endFreq: 0.11,
    category: 'navigation',
    description: 'Low frequency band historically used for LORAN (Long Range Navigation) systems and other radio-navigation services.',
    uses: ['LORAN navigation', 'Differential GPS corrections'],
  },
  {
    id: 'longwave-broadcast',
    name: 'Longwave Broadcast',
    startFreq: 0.153,
    endFreq: 0.279,
    category: 'broadcast',
    description: 'Longwave AM broadcast band used primarily in Europe, Africa, and parts of Asia. Provides reliable ground-wave coverage over long distances.',
    uses: ['AM broadcasting (Europe/Asia)', 'Time signal stations'],
  },
  {
    id: 'lw-beacon',
    name: 'Non-Directional Beacons',
    startFreq: 0.2,
    endFreq: 0.3,
    category: 'navigation',
    description: 'Non-directional beacons (NDBs) used for aircraft navigation, transmitting a continuous signal for direction-finding.',
    uses: ['Aviation NDB navigation', 'Maritime radio beacons'],
  },
]

const mfBands: SpectrumBand[] = [
  {
    id: 'am-broadcast',
    name: 'AM Broadcast Band',
    startFreq: 0.53,
    endFreq: 1.7,
    category: 'broadcast',
    description: 'The standard AM broadcast band (medium wave, 530-1700 kHz, channels spaced 10 kHz apart). Signals travel via ground wave during the day and via sky wave at night, enabling long-distance reception after dark.',
    uses: ['AM radio broadcasting (530-1700 kHz)', 'News, talk radio, sports, music', '107 channels (10 kHz spacing)'],
  },
  {
    id: '160m',
    name: '160m Amateur Band',
    startFreq: 1.8,
    endFreq: 2.0,
    category: 'amateur',
    description: 'The lowest amateur radio band (also called "top band"). Offers challenging long-distance communication, especially at night. Large antennas required.',
    uses: ['Amateur radio (DX, local nets)', 'Nighttime long-distance communication'],
  },
]

const hfBands: SpectrumBand[] = [
  {
    id: '80m',
    name: '80m Amateur Band',
    startFreq: 3.5,
    endFreq: 4.0,
    category: 'amateur',
    description: 'A popular HF amateur band good for regional communication day and night. Excellent for local nets and moderate-distance DX.',
    uses: ['Amateur radio voice (LSB)', 'Digital modes (FT8, RTTY)', 'DX communication (night)'],
  },
  {
    id: 'sw-broadcast-75',
    name: '75m Shortwave Broadcast',
    startFreq: 3.9,
    endFreq: 4.0,
    category: 'broadcast',
    description: 'Shortwave broadcast band used by international broadcasters in the 75m range for regional and global programming.',
    uses: ['International broadcasting', 'Religious and cultural programming'],
  },
  {
    id: 'sw-broadcast-60',
    name: '60m Shortwave Broadcast',
    startFreq: 4.75,
    endFreq: 5.06,
    category: 'broadcast',
    description: 'Tropical shortwave broadcast band used for domestic broadcasting in tropical regions.',
    uses: ['Domestic broadcasting (tropics)', 'International radio'],
  },
  {
    id: '60m',
    name: '60m Amateur Band',
    startFreq: 5.33,
    endFreq: 5.41,
    category: 'amateur',
    description: 'A secondary-use amateur band shared with government services. Operation is on specific channels only in many countries. Excellent propagation characteristics.',
    uses: ['Amateur radio (USB)', 'Reliable regional communication'],
  },
  {
    id: 'sw-broadcast-49',
    name: '49m Shortwave Broadcast',
    startFreq: 5.9,
    endFreq: 6.2,
    category: 'broadcast',
    description: 'Popular shortwave broadcast band, heavily used by international broadcasters year-round.',
    uses: ['International broadcasting', 'World news services'],
  },
  {
    id: '40m',
    name: '40m Amateur Band',
    startFreq: 7.0,
    endFreq: 7.3,
    category: 'amateur',
    description: 'One of the most popular amateur bands. Reliable for both regional and long-distance communication. Good daytime and excellent nighttime propagation.',
    uses: ['Amateur radio voice (LSB)', 'Digital modes', 'DX communication', 'Contesting'],
  },
  {
    id: 'sw-broadcast-41',
    name: '41m Shortwave Broadcast',
    startFreq: 7.2,
    endFreq: 7.45,
    category: 'broadcast',
    description: 'Shortwave broadcast band adjacent to the 40m amateur band, used by international broadcasters.',
    uses: ['International broadcasting'],
  },
  {
    id: 'sw-broadcast-31',
    name: '31m Shortwave Broadcast',
    startFreq: 9.4,
    endFreq: 9.9,
    category: 'broadcast',
    description: 'One of the most heavily used shortwave broadcast bands. Excellent year-round propagation.',
    uses: ['International broadcasting', 'BBC, VOA, Deutsche Welle, etc.'],
  },
  {
    id: '30m',
    name: '30m Amateur Band',
    startFreq: 10.1,
    endFreq: 10.15,
    category: 'amateur',
    description: 'A narrow but useful amateur band at the transition between NVIS and DX propagation. CW and digital modes only (no voice).',
    uses: ['Amateur radio (CW, digital)', 'FT8, RTTY, PSK31', 'DX communication'],
  },
  {
    id: 'sw-broadcast-25',
    name: '25m Shortwave Broadcast',
    startFreq: 11.6,
    endFreq: 12.1,
    category: 'broadcast',
    description: 'Popular daytime shortwave broadcast band with good long-distance propagation.',
    uses: ['International broadcasting'],
  },
  {
    id: '20m',
    name: '20m Amateur Band',
    startFreq: 14.0,
    endFreq: 14.35,
    category: 'amateur',
    description: 'The most popular HF amateur band worldwide. Reliable daytime DX on all modes. Considered the backbone of amateur radio DXing.',
    uses: ['Amateur radio voice (USB)', 'Digital modes', 'DX communication (worldwide)', 'Contesting', 'SSTV'],
  },
  {
    id: 'sw-broadcast-19',
    name: '19m Shortwave Broadcast',
    startFreq: 15.1,
    endFreq: 15.8,
    category: 'broadcast',
    description: 'Daytime shortwave broadcast band with excellent long-distance propagation during sunlit hours.',
    uses: ['International broadcasting'],
  },
  {
    id: '17m',
    name: '17m Amateur Band',
    startFreq: 18.068,
    endFreq: 18.168,
    category: 'amateur',
    description: 'A WARC band known for excellent DX propagation during solar maximum. Often open when 20m and 15m are marginal.',
    uses: ['Amateur radio (USB, CW, digital)', 'DX communication'],
  },
  {
    id: 'sw-broadcast-16',
    name: '16m Shortwave Broadcast',
    startFreq: 17.5,
    endFreq: 18.0,
    category: 'broadcast',
    description: 'Shortwave broadcast band used primarily during daytime hours for global broadcasting.',
    uses: ['International broadcasting'],
  },
  {
    id: '15m',
    name: '15m Amateur Band',
    startFreq: 21.0,
    endFreq: 21.45,
    category: 'amateur',
    description: 'A lively DX band during solar maximum. Can support worldwide communication with modest power and antennas.',
    uses: ['Amateur radio (USB, CW, digital)', 'DX communication', 'Contesting'],
  },
  {
    id: 'cb',
    name: 'CB Band (11m)',
    startFreq: 26.965,
    endFreq: 27.405,
    category: 'other',
    description: 'Citizens Band radio (channels 1-40, 26.965-27.405 MHz, 10 kHz spacing). A license-free personal radio service using AM and SSB. Popular with truckers, off-roaders, and preppers.',
    uses: ['Personal communication', 'Truckers (Ch 19)', 'Emergency communication', 'Off-road groups (Ch 16)'],
  },
  {
    id: '10m',
    name: '10m Amateur Band',
    startFreq: 28.0,
    endFreq: 29.7,
    category: 'amateur',
    description: 'The highest HF amateur band. During solar maximum, it supports worldwide DX with low power. During solar minimum, it behaves like a local VHF band.',
    uses: ['Amateur radio (USB, FM, CW)', 'DX communication (solar max)', 'Local repeaters (FM)', 'SSTV, digital modes'],
  },
  {
    id: 'sw-broadcast-13',
    name: '13m Shortwave Broadcast',
    startFreq: 21.45,
    endFreq: 21.85,
    category: 'broadcast',
    description: 'Shortwave broadcast band used during peak solar activity for global broadcasting.',
    uses: ['International broadcasting'],
  },
]

const vhfBands: SpectrumBand[] = [
  {
    id: '6m',
    name: '6m Amateur Band',
    startFreq: 50,
    endFreq: 54,
    category: 'amateur',
    description: 'The "magic band" — a fascinating transition band between HF and VHF. Known for sudden long-distance openings via sporadic-E and other propagation modes.',
    uses: ['Amateur radio (USB, CW, FM)', 'Sporadic-E DX', 'Meteor scatter', 'FT8'],
  },
  {
    id: 'tv-vhf-low',
    name: 'VHF TV Low Band (Ch 2-6)',
    startFreq: 54,
    endFreq: 88,
    category: 'broadcast',
    description: 'Lower VHF television channels. Used for TV broadcasting before the digital transition; now used for digital TV and some two-way services.',
    uses: ['Digital TV broadcasting', 'Low-VHF TV channels'],
  },
  {
    id: 'fm-broadcast',
    name: 'FM Broadcast Band',
    startFreq: 88,
    endFreq: 108,
    category: 'broadcast',
    description: 'The FM radio broadcast band (87.9-107.9 MHz, 100 channels at 200 kHz spacing). Provides high-fidelity local music and talk radio with resistance to static and interference.',
    uses: ['FM radio broadcasting (87.9-107.9 MHz)', 'Music, news, talk radio', 'HD Radio digital subchannels', 'Channels 200-300'],
  },
  {
    id: 'air-band',
    name: 'Aircraft / Aviation Band',
    startFreq: 108,
    endFreq: 137,
    category: 'aeronautical',
    description: 'The aviation band (108-137 MHz, 8.33 kHz channel spacing). 118-137 MHz is for air traffic control voice (AM), 108-118 MHz is for VOR navigation.',
    uses: ['Air traffic control (118-137 MHz)', 'Pilot communication', 'ATIS / weather', 'VOR navigation (108-118 MHz)', '8.33 kHz channel spacing'],
  },
  {
    id: '2m',
    name: '2m Amateur Band',
    startFreq: 144,
    endFreq: 148,
    category: 'amateur',
    description: 'The most popular VHF amateur band. Local communication via repeaters and simplex, plus satellite, EME (moonbounce), and weak-signal work.',
    uses: ['Local repeater communication', 'Satellite (ISS, CubeSats)', 'EME (moonbounce)', 'APRS (packet)', 'FM simplex', 'SSB/CW weak signal'],
  },
  {
    id: 'marine-vhf',
    name: 'Marine VHF Band',
    startFreq: 156,
    endFreq: 174,
    category: 'maritime',
    description: 'The VHF maritime band (channels 1-28, 60-88, 106-108, 156.025-162.025 MHz). Channel 16 (156.8 MHz) is the international distress and calling frequency.',
    uses: ['Ship-to-ship communication', 'Port operations', 'Distress / safety (Ch 16)', 'Marine weather (Ch 1-10 WX)', 'Digital Selective Calling (Ch 70)'],
  },
  {
    id: 'tv-vhf-high',
    name: 'VHF TV High Band (Ch 7-13)',
    startFreq: 174,
    endFreq: 216,
    category: 'broadcast',
    description: 'Upper VHF television channels. Now primarily used for digital TV broadcasting after the analog shutdown.',
    uses: ['Digital TV broadcasting'],
  },
  {
    id: '1.25m',
    name: '1.25m Amateur Band',
    startFreq: 222,
    endFreq: 225,
    category: 'amateur',
    description: 'A VHF amateur band available in the Americas. Used for local communication via repeaters and simplex.',
    uses: ['Amateur radio (FM, digital)', 'Local repeaters'],
  },
  {
    id: 'public-safety-vhf',
    name: 'Public Safety / Business VHF',
    startFreq: 150,
    endFreq: 174,
    category: 'military',
    description: 'VHF band used by police, fire, EMS, business radio, and other land-mobile services. Being progressively replaced by trunked systems.',
    uses: ['Police / fire / EMS dispatch', 'Business two-way radio', 'Public works'],
  },
]

const uhfBands: SpectrumBand[] = [
  {
    id: '70cm',
    name: '70cm Amateur Band',
    startFreq: 420,
    endFreq: 450,
    category: 'amateur',
    description: 'The most popular UHF amateur band. Widely used for repeater operation, satellite communication, and ATV (amateur television).',
    uses: ['Repeater operation', 'Satellite (AO-7, AO-91, etc.)', 'ATV (amateur television)', 'FM simplex', 'Digital modes (DMR, D-STAR)'],
  },
  {
    id: '433mhz-ism',
    name: '433 MHz ISM / LPD433',
    startFreq: 433.05,
    endFreq: 434.79,
    category: 'ism',
    description: 'Low-power ISM band in the 70cm region. Used by short-range devices, garage openers, key fobs, and LoRa mesh networking. Meshtastic nodes commonly use this band in Europe and Asia.',
    uses: ['LoRa mesh networking (Meshtastic)', 'Key fobs / RKE', 'Garage door openers', 'IoT sensors', 'Baby monitors'],
  },
  {
    id: 'tv-uhf',
    name: 'UHF TV Band (Ch 14-51)',
    startFreq: 470,
    endFreq: 698,
    category: 'broadcast',
    description: 'UHF television channels. After the digital transition and spectrum repack, channels 14-36 remain for digital TV broadcasting.',
    uses: ['Digital TV broadcasting', 'DTV'],
  },
  {
    id: 'lte-band-12',
    name: 'Cellular 700 MHz (Band 12)',
    startFreq: 698,
    endFreq: 746,
    category: 'cellular',
    description: 'Lower 700 MHz cellular band used for LTE and 5G. Offers excellent coverage and building penetration.',
    uses: ['LTE / 4G cellular', '5G NR', 'Mobile broadband'],
  },
  {
    id: 'cellular-800',
    name: 'Cellular 800 MHz',
    startFreq: 824,
    endFreq: 894,
    category: 'cellular',
    description: 'Original cellular band (AMPS, later CDMA, now LTE). The foundation of modern mobile phone networks.',
    uses: ['Cellular voice and data', 'LTE', '5G'],
  },
  {
    id: '868mhz-srd',
    name: '868 MHz SRD / LoRa',
    startFreq: 863,
    endFreq: 870,
    category: 'ism',
    description: 'European Short Range Device band. Heavily used for LoRaWAN IoT networks and Meshtastic mesh networking. Default Meshtastic frequency in Europe is 869.525 MHz.',
    uses: ['LoRa mesh networking (Meshtastic)', 'LoRaWAN IoT', 'Alarm systems', 'Smart home sensors'],
  },
  {
    id: '33cm',
    name: '33cm Amateur Band',
    startFreq: 902,
    endFreq: 928,
    category: 'amateur',
    description: 'UHF amateur band shared with ISM devices. Also used for amateur digital modes and weak-signal work.',
    uses: ['Amateur radio (digital)', 'FM repeaters'],
  },
  {
    id: 'ism-900',
    name: '900 MHz ISM Band',
    startFreq: 902,
    endFreq: 928,
    category: 'ism',
    description: 'Industrial, Scientific, and Medical band at 900 MHz. Used by LoRa mesh networking, RFID, cordless phones, and garage door openers. Meshtastic nodes default to this band in North America (903-927 MHz).',
    uses: ['LoRa mesh networking (Meshtastic)', 'RFID', 'IoT sensors', 'Cordless phones', 'Garage door openers'],
  },
  {
    id: 'gps',
    name: 'GPS L1 / GNSS',
    startFreq: 1565,
    endFreq: 1585,
    category: 'navigation',
    description: 'The primary GPS L1 band and other Global Navigation Satellite System signals. Civilian GPS uses 1575.42 MHz.',
    uses: ['GPS navigation', 'GLONASS', 'Galileo', 'BeiDou', 'Precise timing'],
  },
  {
    id: 'cellular-1900',
    name: 'Cellular PCS 1900 MHz',
    startFreq: 1850,
    endFreq: 1990,
    category: 'cellular',
    description: 'Personal Communications Service band. Used extensively for 2G (GSM), 3G, and LTE in North America.',
    uses: ['LTE / 4G', '3G / UMTS', '5G NR'],
  },
  {
    id: '23cm',
    name: '23cm Amateur Band',
    startFreq: 1240,
    endFreq: 1300,
    category: 'amateur',
    description: 'Wide UHF amateur band used for advanced experimentation including EME (moonbounce), amateur satellite (AO-40), and high-speed digital.',
    uses: ['EME (moonbounce)', 'Amateur satellites', 'High-speed digital', 'ATV'],
  },
  {
    id: 'aws',
    name: 'AWS / Cellular 1700 MHz',
    startFreq: 1710,
    endFreq: 1755,
    category: 'cellular',
    description: 'Advanced Wireless Services band used for LTE and 5G, providing additional capacity for mobile data.',
    uses: ['LTE / 4G', '5G NR', 'Mobile broadband'],
  },
  {
    id: 'wifi-2.4',
    name: '2.4 GHz ISM / Wi-Fi',
    startFreq: 2400,
    endFreq: 2500,
    category: 'ism',
    description: 'The most widely used ISM band worldwide. Wi-Fi channels 1-14 (20 MHz each), Bluetooth 79 channels. Powers countless consumer devices.',
    uses: ['Wi-Fi networks (Ch 1-14)', 'Bluetooth', 'Bluetooth Low Energy', 'Zigbee / Thread', 'Microwave ovens', 'Cordless phones'],
  },
  {
    id: '13cm',
    name: '13cm Amateur Band',
    startFreq: 2300,
    endFreq: 2310,
    category: 'amateur',
    description: 'UHF/SHF amateur band used for satellite communication and advanced experimentation.',
    uses: ['Amateur satellite', 'Experimental communication'],
  },
  {
    id: 'lte-2.5',
    name: 'BRS / 2.5 GHz (Band 41)',
    startFreq: 2500,
    endFreq: 2690,
    category: 'cellular',
    description: 'Broadband Radio Service band used for LTE and 5G mid-band, offering high capacity for mobile data.',
    uses: ['LTE TDD', '5G NR (mid-band)', 'Fixed wireless broadband'],
  },
  {
    id: 'radio-astronomy-uhf',
    name: 'Radio Astronomy (UHF)',
    startFreq: 1400,
    endFreq: 1427,
    category: 'science',
    description: 'Protected radio astronomy band centered on the 21 cm hydrogen line (1420 MHz). Used for mapping neutral hydrogen in the universe.',
    uses: ['Radio astronomy (21 cm hydrogen line)', 'Deep space research'],
  },
]

const shfBands: SpectrumBand[] = [
  {
    id: '9cm',
    name: '9cm Amateur Band',
    startFreq: 3300,
    endFreq: 3500,
    category: 'amateur',
    description: 'Lower SHF amateur band used for wideband digital experiments and amateur television.',
    uses: ['Amateur radio (digital)', 'Wideband experimentation'],
  },
  {
    id: 'c-band-sat',
    name: 'C-Band Satellite (3.7-4.2 GHz)',
    startFreq: 3700,
    endFreq: 4200,
    category: 'satellite',
    description: 'C-band downlink for satellite television and communications. Widely used in the broadcast industry for content distribution.',
    uses: ['Satellite TV broadcast', 'Satellite news gathering', 'Fixed satellite service'],
  },
  {
    id: 'wifi-5',
    name: '5 GHz Wi-Fi / ISM',
    startFreq: 5150,
    endFreq: 5850,
    category: 'ism',
    description: 'Higher-frequency ISM band used for Wi-Fi (802.11a/ac/ax). Channels 36-165 across UNII bands. Offers more channels and less congestion than 2.4 GHz, with shorter range.',
    uses: ['Wi-Fi 5/6 (802.11ac/ax)', 'Point-to-point links', 'Outdoor wireless ISPs', 'Channels 36, 40, 44, 48, 52-64, 100-144, 149-165'],
  },
  {
    id: '5cm',
    name: '5cm Amateur Band',
    startFreq: 5650,
    endFreq: 5925,
    category: 'amateur',
    description: 'SHF amateur band shared with ISM. Used for wideband digital, ATV, and satellite work.',
    uses: ['Amateur radio (digital, ATV)', 'Amateur satellite (Phase 4)'],
  },
  {
    id: '3cm',
    name: '3cm Amateur Band',
    startFreq: 10000,
    endFreq: 10500,
    category: 'amateur',
    description: 'Popular microwave amateur band. Excellent for narrow-band weak signal and wideband digital modes. Often the first microwave band hams experiment with.',
    uses: ['Amateur radio (SSB, CW, digital)', 'EME (moonbounce)', 'Wideband digital', 'ATV'],
  },
  {
    id: 'ku-band-sat',
    name: 'Ku-Band Satellite (11.7-12.7 GHz)',
    startFreq: 10700,
    endFreq: 12700,
    category: 'satellite',
    description: 'Ku-band used extensively for direct-to-home satellite television, VSAT networks, and satellite internet.',
    uses: ['Satellite TV (DirecTV, Dish)', 'VSAT', 'Satellite internet (Starlink, HughesNet)'],
  },
  {
    id: 'k-band-sat',
    name: 'K-Band Satellite (18-20 GHz)',
    startFreq: 18000,
    endFreq: 22000,
    category: 'satellite',
    description: 'K-band used for satellite communications, including gateway links and high-throughput satellites.',
    uses: ['Satellite gateway links', 'Broadband satellite', 'Fixed satellite service'],
  },
  {
    id: '1.2cm',
    name: '1.2cm Amateur Band',
    startFreq: 24000,
    endFreq: 24250,
    category: 'amateur',
    description: 'The highest amateur band commonly used. Advanced experimentation with narrow-band and wideband modes at millimeter-wave frequencies.',
    uses: ['Amateur radio (experimental)', 'High-speed digital', 'Propagation studies'],
  },
  {
    id: 'automotive-radar',
    name: 'Automotive Radar (24 GHz)',
    startFreq: 24000,
    endFreq: 24250,
    category: 'navigation',
    description: 'ISM band used for short-range automotive radar, motion sensors, and industrial applications.',
    uses: ['Automotive radar', 'Motion sensors', 'Industrial sensing'],
  },
]

const ehfBands: SpectrumBand[] = [
  {
    id: 'ka-band-sat',
    name: 'Ka-Band Satellite (27-40 GHz)',
    startFreq: 27000,
    endFreq: 40000,
    category: 'satellite',
    description: 'Ka-band used for high-throughput satellite internet, including modern LEO constellations. Offers large bandwidth but is more susceptible to rain fade.',
    uses: ['Satellite internet (Starlink, OneWeb)', 'Broadband VSAT', 'Gateway links'],
  },
  {
    id: '5g-mmwave',
    name: '5G毫米波 (mmWave)',
    startFreq: 24000,
    endFreq: 40000,
    category: 'cellular',
    description: 'Millimeter-wave frequencies used for 5G NR (n258, n260, n261). Offers extremely high data rates over short distances.',
    uses: ['5G ultra-wideband', 'Fixed wireless access', 'Urban small cells'],
  },
  {
    id: '4mm',
    name: '4mm Amateur Band',
    startFreq: 47000,
    endFreq: 47200,
    category: 'amateur',
    description: 'Millimeter-wave amateur band at 47 GHz. Used for advanced propagation experiments and high-speed digital links.',
    uses: ['Amateur radio (experimental)', 'High-speed digital', 'Propagation studies'],
  },
  {
    id: 'automotive-radar-77',
    name: 'Automotive Radar (77 GHz)',
    startFreq: 76000,
    endFreq: 81000,
    category: 'navigation',
    description: 'High-resolution automotive radar band used for adaptive cruise control, collision avoidance, and autonomous driving systems.',
    uses: ['Adaptive cruise control', 'Collision avoidance', 'Autonomous driving sensors'],
  },
  {
    id: 'radio-astronomy-ehf',
    name: 'Radio Astronomy (mm-wave)',
    startFreq: 85000,
    endFreq: 115000,
    category: 'science',
    description: 'Millimeter-wave radio astronomy bands used for studying molecular clouds, planetary atmospheres, and the cosmic microwave background.',
    uses: ['Radio astronomy', 'Molecular spectroscopy', 'CMB research'],
  },
  {
    id: '2mm',
    name: '2mm Amateur Band',
    startFreq: 122250,
    endFreq: 123000,
    category: 'amateur',
    description: 'Experimental amateur band at 122 GHz. Part of the millimeter-wave spectrum accessible to advanced amateur operators.',
    uses: ['Amateur experimental', 'Millimeter-wave propagation'],
  },
  {
    id: '1mm',
    name: '1mm Amateur Band',
    startFreq: 241000,
    endFreq: 250000,
    category: 'amateur',
    description: 'Sub-millimeter amateur band at 241 GHz. The highest frequency amateur allocation, used for cutting-edge experimental communication.',
    uses: ['Amateur experimental', 'Terahertz research'],
  },
  {
    id: 'thz-imaging',
    name: 'Terahertz / Sub-mm Research',
    startFreq: 100000,
    endFreq: 300000,
    category: 'science',
    description: 'The terahertz gap — frequencies between microwaves and infrared. Used in research for imaging, spectroscopy, and next-generation communication.',
    uses: ['Scientific research', 'Security imaging', 'Spectroscopy', 'Future 6G research'],
  },
]

export const sections: SpectrumSection[] = [
  {
    id: 'vlf',
    name: 'Very Low Frequency (VLF)',
    shortName: 'VLF',
    startFreq: 0.003,
    endFreq: 0.03,
    description: 'VLF waves (3-30 kHz) can penetrate deep into seawater and travel worldwide in the Earth-ionosphere waveguide. Used for submarine communication, time signals, and navigation.',
    bands: vlfBands,
  },
  {
    id: 'lf',
    name: 'Low Frequency (LF)',
    shortName: 'LF',
    startFreq: 0.03,
    endFreq: 0.3,
    description: 'LF waves (30-300 kHz) provide reliable ground-wave propagation over hundreds of kilometers. Used for longwave broadcasting, navigation beacons, and time signals.',
    bands: lfBands,
  },
  {
    id: 'mf',
    name: 'Medium Frequency (MF)',
    shortName: 'MF',
    startFreq: 0.3,
    endFreq: 3,
    description: 'MF (300-3000 kHz) is home to the AM broadcast band. Ground wave by day, sky wave by night. Also includes the 160m amateur band.',
    bands: mfBands,
  },
  {
    id: 'hf',
    name: 'High Frequency (HF)',
    shortName: 'HF',
    startFreq: 3,
    endFreq: 30,
    description: 'HF (3-30 MHz), also called shortwave, enables worldwide communication via sky-wave propagation off the ionosphere. Home to amateur radio, international broadcasting, CB, and utility stations.',
    bands: hfBands,
  },
  {
    id: 'vhf',
    name: 'Very High Frequency (VHF)',
    shortName: 'VHF',
    startFreq: 30,
    endFreq: 300,
    description: 'VHF (30-300 MHz) offers primarily line-of-sight propagation with some long-distance via sporadic-E and tropospheric ducting. Includes FM radio, aircraft, marine, TV, and amateur bands.',
    bands: vhfBands,
  },
  {
    id: 'uhf',
    name: 'Ultra High Frequency (UHF)',
    shortName: 'UHF',
    startFreq: 300,
    endFreq: 3000,
    description: 'UHF (300-3000 MHz) is the workhorse of modern wireless: cellular, Wi-Fi, GPS, Bluetooth, TV, and amateur radio all operate here. Line-of-sight propagation with strong building penetration.',
    bands: uhfBands,
  },
  {
    id: 'shf',
    name: 'Super High Frequency (SHF)',
    shortName: 'SHF',
    startFreq: 3000,
    endFreq: 30000,
    description: 'SHF (3-30 GHz), also called centimeter-band. Used for satellite communications, Wi-Fi 5/6, automotive radar, and advanced amateur radio. Highly directional, susceptible to rain fade.',
    bands: shfBands,
  },
  {
    id: 'ehf',
    name: 'Extremely High Frequency (EHF)',
    shortName: 'EHF',
    startFreq: 30000,
    endFreq: 300000,
    description: 'EHF (30-300 GHz), also called millimeter-wave. Used for 5G mmWave, automotive radar, radio astronomy, and experimental communication. Very short range but enormous bandwidth.',
    bands: ehfBands,
  },
]

export function getAllBands(): SpectrumBand[] {
  return sections.flatMap((s) => s.bands)
}

export function findBand(id: string): SpectrumBand | undefined {
  return getAllBands().find((b) => b.id === id)
}

export function findSectionByBand(bandId: string): SpectrumSection | undefined {
  return sections.find((s) => s.bands.some((b) => b.id === bandId))
}

export function findSectionByFreq(freq: number): SpectrumSection | undefined {
  return sections.find((s) => freq >= s.startFreq && freq <= s.endFreq)
}
