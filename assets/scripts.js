const pageviewsSelector = document.getElementById('pageviewsSelector');
const billing = document.getElementById('billing');
const cardPageViews = document.getElementById('cardPageViews');
const cardPrice = document.getElementById('cardPrice');

const billingPlans = [
    {
        pageviews: "10K", 
        price: 8
    },
    {
        pageviews: "50K", 
        price: 12
    },
    {
        pageviews: "100K", 
        price: 16
    },
    {
        pageviews: "500K", 
        price: 24
    },
    {
        pageviews: "1M", 
        price: 36
    }
]

document.addEventListener('DOMContentLoaded', () => initApp());

const initApp = () => {

    pageviewsSelector.value = 2;
    billing.checked = false;
    pageviewsSelector.addEventListener('input', updateSliderBar); 
    pageviewsSelector.addEventListener('input', setPageviewsAndPrice); 
    billing.addEventListener('change', setPageviewsAndPrice); 

}

const updateSliderBar = () => {

    const barPercent = (pageviewsSelector.value * 100) / 4;
    
    pageviewsSelector.style.background = `linear-gradient(to right, var(--clr-soft-cyan) 0%, var(--clr-soft-cyan) ${barPercent}%, var(--clr-light-grayish-blue) ${barPercent}%, var(--clr-light-grayish-blue) 100%)`;

}

const setPageviewsAndPrice = () => {

    const selectedBilling = billingPlans[pageviewsSelector.value];
    const yearly = billing.checked;

    const { pageviews, price } = selectedBilling;

    while (cardPrice.firstElementChild) {
        cardPrice.removeChild(cardPrice.firstElementChild);
    }

    cardPageViews.textContent = pageviews;

    if (yearly) {
        
        const priceWithDiscount = ((price * 12) * 0.75);

        const priceCardSpan = document.createElement('span');
        priceCardSpan.classList.add('card__price-span');
        priceCardSpan.textContent = '/year';

        cardPrice.textContent = `$${priceWithDiscount.toFixed(2)}`;
        cardPrice.appendChild(priceCardSpan);

        return;

    }

    const priceCardSpan = document.createElement('span');
    priceCardSpan.classList.add('card__price-span');
    priceCardSpan.textContent = '/month';

    cardPrice.textContent = `$${price.toFixed(2)}`;
    cardPrice.appendChild(priceCardSpan);

}