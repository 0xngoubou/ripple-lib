declare function parseFeeUpdate(tx: any): {
    baseFeeXRP: string;
    referenceFeeUnits: any;
    reserveBaseXRP: string;
    reserveIncrementXRP: string;
};
export default parseFeeUpdate;
