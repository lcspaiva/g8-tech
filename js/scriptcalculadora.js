function insert(num,i){ //insere os numeros
    var numero = document.getElementById('resultado'+i).innerHTML 
    document.getElementById('resultado'+i).innerHTML = numero + num
}
function clean(i){ //limpar visor total
    document.getElementById('resultado'+i).innerHTML = ""
}
function back(i){ //exclui numero digitado no visor
    var resultado = document.getElementById('resultado'+i).innerHTML
    document.getElementById('resultado'+i).innerHTML = resultado.substring(0, resultado.length -1)
}
function calcular2(i){
    var resultado = document.getElementById('resultado'+i).innerHTML
    if(resultado){
        document.getElementById('resultado'+i).innerHTML = eval(resultado)//realiza as operações
    }
}


function calcular3(j){
    // string visor
    var resultado = document.getElementById('resultado'+j).innerHTML
    let op;
    for(let i=0; i<resultado.length; i++){
        if(resultado[i] in ["+","-","/","*"]){
            op = true;
            break;
        }
    }
    if(op){
        document.getElementById('resultado'+j).innerHTML = Math.sqrt(eval(resultado)).toFixed(2);
    }else{
        document.getElementById('resultado'+j).innerHTML = Math.sqrt(parseFloat(resultado)).toFixed(2);
    }
}

function calcular4(j){
    // string visor
    var resultado = document.getElementById('resultado'+j).innerHTML
    let op;
    for(let i=0; i<resultado.length; i++){
        if(resultado[i] in ["+","-","/","*"]){
            op = true;
            break;
        }
    }
    if(op){
        document.getElementById('resultado'+j).innerHTML = Math.pow(eval(resultado),3).toFixed(2);
    }else{
        document.getElementById('resultado'+j).innerHTML = Math.pow(parseFloat(resultado),3).toFixed(2)
    }
}

function calcular5(j){
    // string visor
    var resultado = document.getElementById('resultado'+j).innerHTML
    let op;
    for(let i=0; i<resultado.length; i++){
        if(resultado[i] in ["+","-","/","*"]){
            op = true;
            break;
        }
    }
    if(op){
        document.getElementById('resultado'+j).innerHTML = Math.pow(eval(resultado),2).toFixed(2);
    }else{
        document.getElementById('resultado'+j).innerHTML = Math.pow(parseFloat(resultado),2).toFixed(2)
    }
}
    var statusCalc = 0
    $("#button2").click(function(){
        if(statusCalc == 0){
            $("#div1").show()
            $("#div2").hide()
            statusCalc = 1
            document.getElementById("button2").innerHTML = 'Calculadora Cientifica'
        }else{
            $("#div2").show()
            $("#div1").hide()
            statusCalc = 0 
            document.getElementById("button2").innerHTML = 'Calculadora Normal'           
        }
       

    })



//$("#button2").click(function(){
   // $("#div1").hide(3000)
//})




//function calcular(){
  //  document.getElementById("formulario")
   // var raiz = formulario.valor.value
   // raiz = (Math.sqrt(raiz))
   // var resultado = raiz
   // formulario.resultado.value = resultado
//}
//function calcular1(){
    //document.getElementById("formulario1")
   // var raiz1 = formulario1.valor1.value
   // raiz1 = (Math.cbrt(raiz1))
   // var resultado1 = raiz1
   // formulario1.resultado1.value = resultado1
//}
