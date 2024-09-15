export class Helpers{

    static formateDate(data){
        const date = new Date(data);

        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retorna de 0 a 11, por isso adicionamos 1
        const ano = date.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }

    static formateDateManually(data){

        if(data == null){
            return "Data não informada"
        }
        let date = data.split('T')[0]
        let dia = date.split('-')[2]
        let ano = date.split('-')[0]
        let mes = date.split('-')[1]
        return `${dia}/${mes}/${ano}`;
    }

    static formatarCPF(cpf: string): string {
        if(cpf == null){
            return "Sem CPF"
        }
        // Remove todos os caracteres que não sejam dígitos
        const cpfLimpo = cpf.replace(/\D/g, '');

        // Verifica se o CPF tem 11 dígitos
        if (cpfLimpo.length !== 11) {
            throw new Error('CPF inválido. Deve conter 11 dígitos.');
        }

        // Formata o CPF no padrão xxx.xxx.xxx-xx
        return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    static dataURItoBlob = (base64Image: any) => {
        const byteString = atob(base64Image.split(",")[1]);
        const mimeString = base64Image.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], {type: 'image/jpeg'});
    }


    static cpfMask = (value: string) => {
        return value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
            .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }


}