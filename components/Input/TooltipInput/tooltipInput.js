/**
 * (required) type : number | text
 * (required) id : text
 * (optional) blank : boolean
 * (optional) blankMessage : text
 * (optional) disabled: boolean
 * (optional) regExp : tooltip message view condition : regExp ( 양끝 / 제거한 값을 넣어줘야함 )
 * (optional) regExpMessage : tooltip message
 * (optional) frontLabel : text
 * (optional) backLabel : text
 * **/
class TooltipInput extends HTMLElement {
    /**
    * constructor : 최초 실행 생성 Method
    **/
    constructor(){
        super();
        this.render();
    }

    /**
     * render() : 해당 tag에 넣을 html tag를 rerendering한다.
     **/
    render(){
        this.innerHTML = this.getTemplate();
    }

    /**
     * 해당 컴포넌트가 mount될 때 불러진다.
     * **/
    connectedCallback(){
        const attrList = this.attributes;
        const input = this.getElementsByClassName('tooltip-input');

        /**
         * input eventListener
         * **/
        input[0].addEventListener('input', (e) => {
            const blank = e.path[3].attributes.blank;
            const blankMessage = e.path[3].attributes.blankMessage;
            const rex = e.path[3].attributes.regExp;
            const rexMessage = e.path[3].attributes.regExpMessage;

            /* input.value 빈칸인 경우*/
            if(e.currentTarget.value.length === 0){
                if(blank !== null && blank !== undefined && (blank.value === 'true' || blank.value === '')){
                    const tooltipMessage = this.getElementsByClassName('tooltip-message');
                    tooltipMessage[0].className = "tooltip-message";
                    if(blankMessage === undefined){
                        tooltipMessage[0].innerHTML = "값을 입력해주세요.";
                    }
                    else{
                        tooltipMessage[0].innerHTML = blankMessage.value;
                    }

                    console.log(tooltipMessage[0].classList);
                }
            }
            else{
                /* input.value 빈칸이 아닌 경우*/
                /* attr 에 정규식이 있는 경우 */
                if(rex !== null && rex !== undefined){
                    const regExp = new RegExp(rex.value);
                    console.log(!regExp.test(e.currentTarget.value));
                    if(!regExp.test(e.currentTarget.value)){
                        // 정규식 만족 X
                        const tooltipMessage = this.getElementsByClassName('tooltip-message');
                        tooltipMessage[0].className = "tooltip-message";
                        if(rexMessage !== undefined && rexMessage !== null ){
                            tooltipMessage[0].innerHTML = rexMessage.value;
                        }
                        else{
                            tooltipMessage[0].innerHTML = "조건을 만족하지 않습니다.";
                        }
                    }
                    else{
                        if(blank !== null && blank !== undefined && (blank.value === 'true' || blank.value === '')) {
                            const tooltipMessage = this.getElementsByClassName('tooltip-message');
                            tooltipMessage[0].className = "tooltip-message display-none";
                        }
                    }
                }


            }
        });

        /**
         * disabled 값이 존재하는지 체크
         * disabled 값이 존재 == true 인경우 input의 disabled attr 활성화
         * disabled 값이 존재하지 않거나 ( null ) false인 경우 input의 disabled attr 비활성화(삭제)
         * **/

        if(attrList.getNamedItem('disabled') !== null && (attrList.getNamedItem('disabled').value === "true" || attrList.getNamedItem('disabled').value === "")){
            /**
             * disabled 값이 true인 경우 input의 disabled attr 활성화
             * */
            input[0].setAttribute('disabled','disabled');
        }

        /**
         * input값이 빈칸인 경우 확인해야하는지 체크
         * blank === true && blankMessage === undefined => "입력값이 필요합니다."
         * blank === true && blankMessage !== undefined => "blankMessage"
         * **/

        if(attrList.getNamedItem('blank') !== null && (attrList.getNamedItem('blank').value === "true" ||attrList.getNamedItem('blank').value === "blank") ){
            /**
             * blank === true
             * **/
            if(input[0].value === ''){
                const tooltipMessage = this.getElementsByClassName('tooltip-message');
                if(attrList.getNamedItem('blankMessage') !== null ){
                    // blank === true && blankMessage === undefined => "입력값이 필요합니다."
                    tooltipMessage[0].innerHTML = attrList.getNamedItem('blankMessage').value;
                }
                else{
                    // blank === true && blankMessage !== undefined => "blankMessage"
                    tooltipMessage[0].innerHTML = "입력값이 필요합니다.";
                }
            }
        }
    }


    /**
     * 해당 tag에 attributes를 observing한다.
     * **/
    static get observedAttributes(){
        return ['type', 'id', 'blank'];
    }

    /**
     * getTemplate() : rendering될 html tag에 대한 template이다.
     * **/
    getTemplate(){
        let frontLabel,
            backLabel;

        const type = this.attributes.type.value || '';
        const id = this.attributes.id.value || '';

        frontLabel = this.attributes.frontLabel !== undefined ? this.attributes.frontLabel.value : '';
        backLabel = this.attributes.backLabel !== undefined ? this.attributes.backLabel.value : '';


        return `
            <style>
                input[type="number"]::-webkit-outer-spin-button,
                input[type="number"]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                
                div{
                    width : 100%;
                }
                
                .tooltip-input{
                    width : 100%;
                    height : 26px;
                    border-radius: 4px;
                    box-shadow: inset 0 3px 2px 0 rgba(49,49,49,0.13);
                    border : solid 1px #b4b4b4;
                    background: #fff;
                    padding-left : 12px;
                    
                    /* font */
                    font-style : normal;
                    font-size : 12px;
                    font-weight : 600;
                    font-family: 'Roboto';
                    color : #6e6e6e;
                }
                
                .label-text{
                    font-style : normal;
                    font-size : 12px;
                    font-weight : 600;
                    font-family: 'Roboto';
                    color : #6e6e6e;
                }
                
                .disabled{
                    background: #e6e6e6;
                }
                
                .display-none{
                    display : none;
                }
                
                .display-block{
                    display: block;
                }
                
                .tooltip-message{
                    width : auto;
                    height : 16px;
                    border : 1px solid #ede381;
                    background: #f7f2c0;
                    color : #9d870e;
                    
                    white-space: nowrap;
                    
                    position : absolute;
                    right : -15px;
                    top : -32px;
                    padding : 7px 13px 7px 18px;
                    z-index : 30; 
                }
                
                .tooltip-box{
                    min-width : 50px;
                    display: block;
                    position : relative;
                }
                
                .tooltip-box-container{
                    width : 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
                
                .front{
                    width : auto;
                    white-space: nowrap;
                    margin-right : 10px;
                }
                
                .back{
                    width : auto;
                    white-space: nowrap;
                    margin-left : 25px;
                }
                
            </style>
            
            <div class="tooltip-box-container">
                <label for="${id}" class="label-text front">${frontLabel}</label>
                <div class="tooltip-box">
                    <input id="${id}" type="${type}" class="tooltip-input"/>
                    <span class="tooltip-message display-none"></span>
                </div>
                <label for="${id}" class="label-text back">${backLabel}</label>
            </div>
        `;
    }

    /**
     * 해당 컴포넌트가 unmount될 때 불리어 진다.
     * **/
    disconnectedCallback(){

    }


    /**
     * attributes가 수정된다면 수정된 갯수만큼 불리어 진다.
     * **/
    attributeChangedCallback(name, oldValue, newValue){

    }
};

/**
 * tool-tip 이라는 tag가 customElements에 있는가? 없다면 새롭게 define하라는 코드로,
 * 동일 tag가 2번 define하면 오류가 날 수 있으므로, component가 여러차례 사용되면서 define되는 것을 막기 위한 용도이다.
 * **/

// Define the new web component
if ('customElements' in window) {
    customElements.define('tooltip-input', TooltipInput);
}


