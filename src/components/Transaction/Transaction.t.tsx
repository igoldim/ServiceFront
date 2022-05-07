export interface TransactionProps {
    id: string;
    userName: string; //Igor Goldim
    scheduleDate: string;  // 07/05/2022  ==> pegar dia da semana (Sabádo)
    amount: string;
    art: {
        icon: string,
        background: string
    };
}


export interface TransactionSectionProps {
    data: Array<TransactionProps>;
}

export interface TransactionAviProps {
    icon: any,
    background: string
}