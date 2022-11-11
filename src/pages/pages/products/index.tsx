// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

import React from "react";
// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import ProductModel from 'src/models/products/product-model'
import { useEffect } from 'react'
import { fetchAllProducts } from 'src/store/ducks/products'
import { useAppDispatch, useAppSelector } from 'src/@core/hooks/useRedux'

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}
const ProductsList = () => {
  const dispatch = useAppDispatch();
  const rows = useAppSelector(state => state.products.items);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell>Código de barras</TableCell>
              <TableCell>Fabricante</TableCell>
              <TableCell>Preço de custo</TableCell>
              <TableCell>Valor de revenda</TableCell>
              <TableCell>Quantidade em estoque</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row: ProductModel) => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                    <Typography variant='caption'>{row.description}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.barCode}</TableCell>
                <TableCell>{row.manufacturer}</TableCell>
                <TableCell>{row.costPrice}</TableCell>
                <TableCell>{row.salePrice}</TableCell>
                <TableCell>{row.stockQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default ProductsList