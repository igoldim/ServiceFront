export interface TransactionProps {
    id: string;
    userName: string; //Igor Goldim
    scheduleDate: string;  // 07/05/2022  ==> pegar dia da semana (Sabádo)
    scheduleTime: string;  // 08:00
    amount: string;
    art: {
        icon: string,
        background: string
    };
}


export interface TransactionSectionProps {
    data: Array<TransactionProps>;
    title: string;
    subtitle: string;
}

export interface TransactionAviProps {
    icon?: string | undefined,
    background: string,
    texto?: string | undefined,
}