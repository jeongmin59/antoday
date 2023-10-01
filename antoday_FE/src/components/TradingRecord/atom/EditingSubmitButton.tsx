interface EditingSubmitButtonProps {
  editedTradeAt?: Date;
  editedCorpName?: string;
  editedOptionBuySell?: string;
  editedPrice?: number;
  editedCnt?: number;
  keywords?: string[];
  editedReason?: string;
}

const EditingSubmitButton : React.FC<EditingSubmitButtonProps> = ({
  editedTradeAt,
  editedCorpName,
  editedOptionBuySell,
  editedPrice,
  editedCnt,
  keywords,
  editedReason
}) => {
  console.log('ghkrdlsgo봅시다',editedTradeAt,
  editedCorpName,
  editedOptionBuySell,
  editedPrice,
  editedCnt,
  keywords,
  editedReason)
  return ( 
    // <BasicButton  text="수정"/>
   );
}
 
export default EditingSubmitButton;