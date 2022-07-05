export type TransactionProps = {
    id: string;
    userName: string; //Igor Goldim
    scheduleDate: string;  // 07/05/2022  ==> pegar dia da semana (Sabádo)
    scheduleTime: string;  // 08:00
    amount: string;
    primaryColor: string;
    secondColor: string;    
    art: {
        icon: string,
        background: string
    };
}

