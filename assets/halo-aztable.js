class AZTable extends HTMLElement {
    constructor() {
        super();
        this.azTable = document.getElementById('haloAZTable');
        this.azWrapper = document.getElementById('haloAZWrapper');
        this.azTableMega = document.querySelectorAll('.megamenu_style_4 .azbrandsTable a');

        this.azTableMega.forEach((azButtonMega) => {
            azButtonMega.addEventListener('click', this.activeBrand.bind(this));
        });

        if(!this.azTable || !this.azWrapper) return;
        if(this.azTable.querySelector('a')){
	        this.azTable.querySelectorAll('a').forEach((azButton) => {
	        	azButton.addEventListener('click', this.onClickHandler.bind(this));
	        });
	    }

        const allGroups = this.azWrapper.querySelectorAll('.az-group')
        allGroups.forEach(group => {
            const groupList = group.querySelector('.brand')
            if (groupList == null) {
                group.classList.add('hide')
            }
        })

        this.activeBrand();
    }

    activeBrand(event) {
        let hash = event ? event.target.innerHTML.toLowerCase() : window.location.hash.slice(1),
            brand = document.querySelector(`[data-href="${hash}"]`);
        if (hash != undefined && hash != '' && !brand.closest('li').matches('.disable')) brand.click();
    }

    onClickHandler(event) {
        event.preventDefault();

        const box = this.azWrapper.getBoundingClientRect()
        const totalOffset = box.top + document.documentElement.scrollTop
        window.scrollTo({
            top: totalOffset,
            behavior: 'smooth'
        })

        this.azTable.querySelectorAll('li').forEach((element) =>{
        	element.classList.remove('is-active');
        });

        event.target.closest('li').classList.add('is-active');

        var letter = event.target.getAttribute('data-href');

        this.azWrapper.querySelectorAll('.az-group').forEach((element) =>{
        	element.classList.remove('is-active');
        });

        if (letter != undefined && letter != null) {
            this.azWrapper.classList.remove('active-all');
            this.azWrapper.querySelector(`[data-letter="${letter}"]`).classList.add('is-active');
        } else {
            this.azWrapper.classList.add('active-all');
        }
    }
}

customElements.define('aztable-items', AZTable);