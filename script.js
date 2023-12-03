var ans = 0;
var buffer = '0';
var preOperator;
var handleMathCalled = false;
const btns = document.querySelector('.btns');
const display = document.querySelector('#display');
display.innerText = '0';

function handleButton(btValue){
    if(isNaN(btValue) && btValue !== '.'){
        handleSymbol(btValue);
    }else{
        handleNumber(btValue);
    }
    if(handleMathCalled){
        display.innerText = parseFloat(ans);
        handleMathCalled = false;
    }
    else{
        display.innerText = buffer;
    }
}

function handleSymbol(btValue){
    
    switch(btValue){
        case 'C':
            buffer = '0';
            ans = 0;
            break;
        case '=':
            if(preOperator === null){
                return;
            }
            oper(parseFloat(buffer));
            preOperator = null;
            buffer = ans;
            
            break;
        case 'CE':
            if(parseFloat(buffer) === ans){
                ans = 0;  
            }
            buffer = '0';
            break;
        case '+/-':
            if(buffer === '0'){
                return;
            }else{
                buffer = -buffer;
            }
            break;
        case "del":
            buffer = buffer.toString();
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(btValue);
            break;
    }
}

function handleNumber(btValue){
    if(buffer === '0'){
        buffer = btValue;
    }
    else{
        buffer += btValue;
    }
}
function handleMath(btValue){
    handleMathCalled = true;
    const numBuffer = parseFloat(buffer);
    if(ans === 0){
        ans = numBuffer;
    }
    else{
        oper(numBuffer);
        
    }
    if(btValue !== null){
        preOperator = btValue;
    }
    buffer = '0';
}
function oper(numBuffer){
    if(preOperator === '+'){
        ans += numBuffer;
    }else if(preOperator === '-'){
        ans -= numBuffer;
    }else if(preOperator === '*'){
        ans *= numBuffer;
    }else if(preOperator === '/'){
        ans /= numBuffer;
    }
}

btns.addEventListener('click', function(event){
    handleButton(event.target.innerText);
    console.log("ans："+ans);
    console.log("buffer："+buffer);
});