const i18n = {
    es: {
        langBtn: "🇺🇸 EN",
        heroTit: "Cotiza tu Contenedor Al Instante",
        heroSub: "Encuentra los precios estimados de alquiler o venta, con entrega directa en tu ubicación.",
        modeLabel: "¿Qué necesitas?",
        modeRent: "Alquilar (Mensual)",
        modeBuy: "Comprar",
        locLabel: "Ubicación de Retiro",
        typeLabel: "Tamaño del Contenedor",
        type20: "20' Estándar",
        type40hc: "40' High Cube (HC)",
        type45hc: "45' High Cube (HC)",
        zipLabel: "Código Postal de Entrega (US)",
        zipHint: "Ingresa el Zip Code donde se entregará el contenedor.",
        btnCalc: "Obtener Presupuesto Estimado",
        calcLoading: "Calculando...",
        errZip: "Código postal inválido o no encontrado.",
        resTit: "Resumen de Cotización",
        resCont: "Costo Base del Contenedor",
        resTrans: "Costo de Transporte (Envío)",
        resTransRent: "Costo de Transporte (Envío y Recogida)",
        resTot: "Total Estimado",
        distLabel: "Distancia estimada:",
        milesUnit: "millas",
        disclaim: "* Los precios mostrados son estimaciones basadas en nuestras tarifas base. La tarifa final será confirmada formalmente.",
        resDiscount: "🎉 Descuento App",
        waBtn: "📲 Obtener confirmación del precio",
        waMsg: (mode, loc, type, zip, miles, base, transport, total) =>
            `Hola! Me interesa la siguiente cotización:\n` +
            `• Modalidad: ${mode}\n` +
            `• Contenedor: ${type}\n` +
            `• Retiro desde: ${loc}\n` +
            `• Entrega en ZIP: ${zip} (~${miles} millas)\n` +
            `• Costo base del contenedor: ${base}\n` +
            `• Costo de transporte: ${transport}\n` +
            `• *TOTAL ESTIMADO: ${total}*\n\n` +
            `¿Pueden confirmarme esta cotización? Gracias!`
    },
    en: {
        langBtn: "🇪🇸 ES",
        heroTit: "Instant Container Quote",
        heroSub: "Get estimated pricing for rent or purchase, with direct delivery to your location.",
        modeLabel: "What do you need?",
        modeRent: "Rent (Monthly)",
        modeBuy: "Buy",
        locLabel: "Pickup Location",
        typeLabel: "Container Size",
        type20: "20' Standard",
        type40hc: "40' High Cube (HC)",
        type45hc: "45' High Cube (HC)",
        zipLabel: "Delivery Zip Code (US)",
        zipHint: "Enter the Zip Code where the container will be delivered.",
        btnCalc: "Get Estimated Quote",
        calcLoading: "Calculating...",
        errZip: "Invalid or not found US zip code.",
        resTit: "Quote Summary",
        resCont: "Base Container Cost",
        resTrans: "Transport Cost (Delivery)",
        resTransRent: "Transport Cost (Delivery & Pickup)",
        resTot: "Estimated Total",
        distLabel: "Estimated distance:",
        milesUnit: "miles",
        disclaim: "* Prices shown are estimates based on our standard rates. The exact rate will be formally confirmed.",
        resDiscount: "🎉 App Discount",
        waBtn: "📲 Get Price Confirmation",
        waMsg: (mode, loc, type, zip, miles, base, transport, total) =>
            `Hello! I'm interested in the following quote:\n` +
            `• Mode: ${mode}\n` +
            `• Container: ${type}\n` +
            `• Pickup from: ${loc}\n` +
            `• Delivery ZIP: ${zip} (~${miles} miles)\n` +
            `• Base container cost: ${base}\n` +
            `• Transport cost: ${transport}\n` +
            `• *ESTIMATED TOTAL: ${total}*\n\n` +
            `Can you confirm this quote? Thank you!`
    }
};

let currentLang = 'es';

// Precios Reales Proveídos
const PRICING = {
    buy: {
        miami: { "20": 1350, "40hc": 1650, "45hc": 2000 },
        tampa: { "20": 1500, "40hc": 1700, "45hc": 2000 },
        titusville: { "20": 1600, "40hc": 1850, "45hc": 2100 },
        savannah: { "20": 1200, "40hc": 1600, "45hc": 1950 },
        jacksonville: { "20": 1600, "40hc": 1950 }
    },
    rent: {
        miami: { "20": 150, "40hc": 250, "45hc": 280 },
        tampa: { "20": 150, "40hc": 250, "45hc": 280 },
        titusville: { "20": 150, "40hc": 250, "45hc": 280 },
        savannah: { "20": 150, "40hc": 250, "45hc": 280 },
        jacksonville: { "20": 150, "40hc": 250 }
    }
};

const LOCATIONS = {
    miami: { lat: 25.8229, lon: -80.4005 },       // 33178
    tampa: { lat: 27.9398, lon: -82.3768 },       // 33619
    titusville: { lat: 28.5830, lon: -80.8197 },  // 32780
    savannah: { lat: 32.1281, lon: -81.2050 },    // 31408
    jacksonville: { lat: 30.3944, lon: -81.5619 } // 32218
};

// Fórmula Haversine modificada (+ 20% para aproximar rutas terrestres)
function getDistanceInMiles(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Radio de la Tierra en millas
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d * 1.25; // 25% extra aproximado por rutas de carretera en USA
}

function calculateTransport(miles) {
    if (miles <= 40) return 350;
    if (miles <= 70) return 400;
    if (miles <= 100) return 500;
    return miles * 5;
}

// Referencias del DOM
const els = {
    langBtn: document.getElementById('lang-toggle'),
    heroTit: document.getElementById('t-hero-title'),
    heroSub: document.getElementById('t-hero-sub'),
    modeLabel: document.getElementById('t-label-mode'),
    modeRent: document.getElementById('t-mode-rent'),
    modeBuy: document.getElementById('t-mode-buy'),
    locLabel: document.getElementById('t-label-location'),
    typeLabel: document.getElementById('t-label-type'),
    zipLabel: document.getElementById('t-label-zip'),
    zipHint: document.getElementById('t-hint-zip'),
    zipError: document.getElementById('zip-error'),
    btnCalc: document.getElementById('t-btn-calc'),
    resTit: document.getElementById('t-res-title'),
    resCont: document.getElementById('t-res-container'),
    resTrans: document.getElementById('t-res-transport'),
    resTot: document.getElementById('t-res-total'),
    resMilesLab: document.getElementById('t-res-miles'),
    valMiles: document.getElementById('val-miles'),
    disclaim: document.getElementById('t-disclaimer')
};

function setLanguage(lang) {
    const d = i18n[lang];
    els.langBtn.innerHTML = d.langBtn;
    els.heroTit.innerText = d.heroTit;
    els.heroSub.innerText = d.heroSub;
    els.modeLabel.innerText = d.modeLabel;
    els.modeRent.innerText = d.modeRent;
    els.modeBuy.innerText = d.modeBuy;
    els.locLabel.innerText = d.locLabel;
    els.typeLabel.innerText = d.typeLabel;

    // Select options logic
    const tc = document.getElementById('container-type');
    tc.options[0].text = d.type20;
    tc.options[1].text = d.type40hc;
    tc.options[2].text = d.type45hc;

    els.zipLabel.innerText = d.zipLabel;
    els.zipHint.innerText = d.zipHint;
    els.btnCalc.innerText = d.btnCalc;
    els.resTit.innerText = d.resTit;
    els.resCont.innerText = d.resCont;
    // resTrans se determinará en el cálculo según el modo seleccionado
    els.resTot.innerText = d.resTot;
    els.resMilesLab.innerText = d.distLabel;
    els.disclaim.innerText = d.disclaim;

    els.zipError.innerText = d.errZip; // Prepare error text just in case
}

els.langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    setLanguage(currentLang);

    const resBox = document.getElementById('result-box');
    if (!resBox.classList.contains('hidden')) {
        resBox.classList.add('hidden');
    }
});

function updateContainerOptions() {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const loc = document.getElementById('location').value;
    const tc = document.getElementById('container-type');

    // El usuario indicó que en Tampa, Titusville y Jacksonville no hay 45'
    for (let i = 0; i < tc.options.length; i++) {
        if (tc.options[i].value === '45hc') {
            if (loc === 'tampa' || loc === 'titusville' || loc === 'jacksonville') {
                tc.options[i].style.display = 'none';
                if (tc.value === '45hc') tc.value = '40hc';
            } else {
                tc.options[i].style.display = '';
            }
        }
    }
}

document.getElementById('location').addEventListener('change', updateContainerOptions);
document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener('change', updateContainerOptions);
});

// Inicializar estado de opciones
updateContainerOptions();

// Lógica de cálculo
document.getElementById('quote-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const d = i18n[currentLang];
    els.zipError.classList.add('hidden');
    els.zipError.innerText = '';
    els.btnCalc.disabled = true;
    els.btnCalc.innerText = d.calcLoading;

    const mode = document.querySelector('input[name="mode"]:checked').value;
    const loc = document.getElementById('location').value;
    const type = document.getElementById('container-type').value;
    const zip = document.getElementById('zipcode').value;

    let distance = 0;

    try {
        const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
        if (!response.ok) throw new Error("Zip not found");
        const data = await response.json();

        const destLat = parseFloat(data.places[0].latitude);
        const destLon = parseFloat(data.places[0].longitude);
        const origin = LOCATIONS[loc];

        // 1. Obtener la ruta de manejo real usando la API pública OSRM (Open Source Routing Machine)
        try {
            const osrmRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${destLon},${destLat}?overview=false`);
            if (!osrmRes.ok) throw new Error("OSRM failed");
            const osrmData = await osrmRes.json();

            if (osrmData.routes && osrmData.routes.length > 0) {
                // La distancia viene en metros, la convertimos a millas reales de conducción
                distance = osrmData.routes[0].distance / 1609.344;
            } else {
                throw new Error("No route found");
            }
        } catch (e) {
            // FALLBACK: Si OSRM falla, usamos la fórmula matemática original ajustada
            distance = getDistanceInMiles(origin.lat, origin.lon, destLat, destLon);
        }

    } catch (err) {
        els.btnCalc.disabled = false;
        els.btnCalc.innerText = d.btnCalc;
        els.zipError.innerText = d.errZip;
        els.zipError.classList.remove('hidden');
        return;
    }

    els.btnCalc.disabled = false;
    els.btnCalc.innerText = d.btnCalc;

    const baseCost = PRICING[mode][loc][type];

    // Si alquilan, se cobra viaje de ida y viaje de recogida
    let transportCost = calculateTransport(distance);
    if (mode === 'rent') {
        transportCost = transportCost * 2;
        els.resTrans.innerText = d.resTransRent;
    } else {
        els.resTrans.innerText = d.resTrans;
    }

    const totalCost = baseCost + transportCost;

    // Descuento $100 para alquiler y compra
    const DISCOUNT = 100;
    const finalTotal = totalCost - DISCOUNT;

    // Formateador de moneda (USD)
    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    // Mostrar / ocultar fila de descuento
    const discountRow = document.getElementById('discount-row');
    const discountLabel = document.getElementById('t-res-discount');
    if (DISCOUNT > 0) {
        discountLabel.innerText = d.resDiscount;
        document.getElementById('val-discount').innerText = '-' + formatCurrency(DISCOUNT);
        discountRow.classList.remove('hidden');
    } else {
        discountRow.classList.add('hidden');
    }

    let mesSuffix = mode === 'rent' ? (currentLang === 'es' ? '/mes' : '/month') : '';

    document.getElementById('val-base').innerText = formatCurrency(baseCost) + mesSuffix;
    document.getElementById('val-transport').innerText = formatCurrency(transportCost);
    els.valMiles.innerText = `${Math.round(distance)} ${d.milesUnit}`;

    let initialTotalText = mode === 'rent' ? (currentLang === 'es' ? ' (1er mes)' : ' (1st month)') : '';
    document.getElementById('val-total').innerText = formatCurrency(finalTotal) + initialTotalText;

    els.resCont.innerText = d.resCont;

    const resBox = document.getElementById('result-box');
    resBox.classList.remove('hidden');

    // Mover la pantalla hacia los resultados
    resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Pequeño truco para forzar re-animación
    resBox.style.animation = 'none';
    resBox.offsetHeight; /* trigger reflow */
    resBox.style.animation = null;

    // --- Botón de WhatsApp ---
    // ⚠️ Reemplaza el número de abajo con el de tu WhatsApp de negocios (con código de país, sin +)
    const WHATSAPP_NUMBER = '+17867684409';

    const locNames = {
        miami: 'Miami (33178)', tampa: 'Tampa (33619)',
        titusville: 'Titusville (32780)', savannah: 'Savannah (31408)',
        jacksonville: 'Jacksonville (32218)'
    };
    const typeNames = {
        '20': "20' Estándar / Standard",
        '40hc': "40' High Cube (HC)",
        '45hc': "45' High Cube (HC)"
    };
    const modeDisplay = mode === 'rent'
        ? (currentLang === 'es' ? 'Alquiler (Mensual)' : 'Rent (Monthly)')
        : (currentLang === 'es' ? 'Compra' : 'Purchase');

    const totalDisplay = formatCurrency(finalTotal) + (mode === 'rent' ? (currentLang === 'es' ? ' (1er mes)' : ' (1st month)') : '');

    const discountLine = DISCOUNT > 0 ? `• ${d.resDiscount}: -${formatCurrency(DISCOUNT)}\n` : '';
    const waText = d.waMsg(
        modeDisplay,
        locNames[loc],
        typeNames[type],
        zip,
        Math.round(distance),
        formatCurrency(baseCost) + (mode === 'rent' ? (currentLang === 'es' ? '/mes' : '/month') : ''),
        formatCurrency(transportCost),
        totalDisplay
    ) + (DISCOUNT > 0 ? `\n• ${d.resDiscount} aplicado: -${formatCurrency(DISCOUNT)}` : '');

    const waBtn = document.getElementById('wa-btn');
    waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
    waBtn.innerText = d.waBtn;
    waBtn.classList.remove('hidden');
});
