import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined'

export default function CheckboxLabels() {
  const [state, setState] = React.useState({
    checked: true,
  })

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            icon={<ShoppingBasketOutlinedIcon />}
            checkedIcon={<ShoppingBasketIcon />}
            value="checked"
            name="buy"
          />
        }
        label="Buy"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<AttachMoneyOutlinedIcon />}
            checkedIcon={<AttachMoneyOutlinedIcon />}
            value="checked"
            name="sell"
          />
        }
        label="Sell"
      />
    </FormGroup>
  )
}
