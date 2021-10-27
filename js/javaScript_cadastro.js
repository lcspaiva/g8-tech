$( document ).ready(function(){

    $("#btn_enviar").click(function(){
        //Chamada de função para validar data de nascimento
        //Idade permitida até 130 anos
        //Não permitido data de nascimento maior que 16/03/2021.
        validarDataNasc();
    
        //Chamada de função para validar cpf
        var cpf = document.getElementById("idCpf").value;
        if(!validacaoCpf(cpf))alert("CPF Inválido");

    });

    //Validação do campo data de nascimento, não é permitido data superior a 16/03/2021
    function validarDataNasc(){
        //Constante que irá receber a data parâmetro.
        //Pessoas nascidas após esta data serão classificadas como idade zero.
        const dataParam = new Date();
        const dataLimite = new Date();
        let dataForm = new Date();
        //Setando o valor de 16/03/2021 na constante dataParam
        dataParam.setFullYear(2021, 2, 16);
        dataLimite.setFullYear(1981,2,16);
       
        //Cria novo objeto data
        let dataNascimento = new Date($("#idDataNasc").val());
   
        let dia = dataNascimento.getDate()+1;
        let mes = dataNascimento.getMonth();
        let ano = dataNascimento.getUTCFullYear();

        console.log("Dia: "+dia);
        console.log("Mês: "+mes);
        console.log("Ano: "+ano);
        dataForm.setFullYear(ano,mes,dia);

        //Formata data parâmetro (16/03/2021) para timezone UTC
        //let dtParam = dataParam.toLocaleDateString("pt-BR", {timeZone: "UTC"});
        //let dtForm = dataForm.toLocaleDateString("pt-BR", {timeZone: "UTC"});
    
        //Permite apenas data de nasc menor que 16/03/2021
        if (dataForm >= dataParam){
            alert("'Data de nascimento não pode ser MAIOR que 15/03/2021'");
            $("#idDataNasc").val("");
            $("#idDataNasc").focus();
        } 

        //Permite apenas data de nasc maior que 16/03/1981
        if (dataForm <= dataLimite){
            alert("'Data de nascimento não pode ser MENOR que 15/03/1981'");
            $("#idDataNasc").val("");
            $("#idDataNasc").focus();
        } 

        
    }

    function validacaoCpf(cpf) {
        let Soma, Resto;
        Soma = 0;
        
        if (cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" ||
            cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" ||
            cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" ||
            cpf == "99999999999") return false;

        for (i=1; i<=9; i++)
            Soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        
        if (Resto != parseInt(cpf.substring(9, 10)) ) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++)
            Soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;

        if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
        
        return true;
    }

    
    // Botão de acessibilidade
    $("#acess1").on("click", () => {
    $(".A, .B, .C, .D, button, .footer, a").toggleClass("zoom01")
    $(".header").toggleClass("zoom02")
    });

    
})
