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
    <div>
      버튼이 들어갈 자리
    </div>
   );
}
 
export default EditingSubmitButton;