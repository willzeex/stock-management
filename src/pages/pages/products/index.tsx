// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import ProductModel from 'src/models/products/product-model'
import { fetchAddProduct, fetchAllProducts, fetchDeleteProduct, fetchUpdateProduct } from 'src/store/ducks/products'
import { useAppDispatch, useAppSelector } from 'src/@core/hooks/useRedux'
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { useEffect } from 'react'
import React from 'react'
import Manufacturer from 'src/models/products/manufacturer'
import { fetchAllManufacturers } from 'src/store/ducks/manufacturers'

const ProductsList = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(state => state.products.items);
  const manufacturers = useAppSelector(state => state.manufacturers.items);

  const [open, setOpen] = React.useState(false);
  const [isUpdateAction, setIsUpdateAction] = React.useState(false);
  const [product, setProduct] = React.useState<ProductModel>(new ProductModel());

  const handleChange = (event: SelectChangeEvent) => {
    const manufacturerId = event.target.value
    const manufacturer = manufacturers?.find(m => m.id === manufacturerId);
    setProduct({ ...product, [event.target.name]: manufacturer });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllManufacturers());
  }, []);

  const handleClickOpen = () => {
    setIsUpdateAction(false);
    setOpen(true);
  };

  const handleClickOpenEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const productId = event.currentTarget.getAttribute('data-id')
    const productToEdit = products?.find(p => p.id === productId);
    if (productToEdit) {
      setProduct(productToEdit);
      setIsUpdateAction(true);
      setOpen(true);
    }
  };

  const handleClickDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const productId = event.currentTarget.getAttribute('data-id');
    if (productId)
      dispatch(fetchDeleteProduct(productId));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (isUpdateAction) {
      dispatch(fetchUpdateProduct(product));
    } else {
      dispatch(fetchAddProduct(product));
    }

    setOpen(false);
    setProduct(new ProductModel());
  };

  return (
    <Grid container spacing={2} >
      <Grid item xs={9}>
        <Typography variant='h5'>
          <Link href='#'>
            Produtos
          </Link>
        </Typography>

        <Typography variant='body2'>Consulte, cadastre ou edite seus produtos.</Typography>
      </Grid>
      <Grid item xs={3} justifyContent="flex-end" alignItems="flex-start" >
        <Button size='large' type='submit' variant='outlined' onClick={handleClickOpen}>
          Adicionar
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Lista de Produtos' titleTypographyProps={{ variant: 'h6' }} />
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
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products?.map((row: ProductModel) => (
                    <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                      <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                          <Typography variant='caption'>{row.description}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.barCode}</TableCell>
                      <TableCell>{row.manufacturer?.name}</TableCell>
                      <TableCell>{row.costPrice}</TableCell>
                      <TableCell>{row.salePrice}</TableCell>
                      <TableCell>{row.stockQuantity}</TableCell>
                      <TableCell>
                        <Button data-id={row.id} onClick={handleClickOpenEdit}>
                          <EditIcon />
                        </Button>
                        <Button data-id={row.id} onClick={handleClickDelete}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Card>
      </Grid>

      <div>
        <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth={true}>
          <DialogTitle>Cadastrar novo produto</DialogTitle>
          <DialogContent>
            <FormControl variant="standard" fullWidth>
              <TextField margin="dense" name="barCode" label="Código de barras" type="text" value={product.barCode} fullWidth variant="standard" autoFocus onChange={onChange} />
            </FormControl>

            <FormControl variant="standard" fullWidth>
              <TextField margin="dense" name="name" label="Nome" type="text" value={product.name} fullWidth variant="standard" onChange={onChange} />
            </FormControl>

            <FormControl variant="standard" fullWidth>
              <InputLabel id="manufacturer-lable">Fabricante</InputLabel>
              <Select labelId="manufacturer-lable" name="manufacturer" value={product.manufacturer?.id} onChange={handleChange}>
                {manufacturers?.map((item: Manufacturer) => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" fullWidth>
              <TextField margin="dense" name="costPrice" label="Preço de custo" type="number" fullWidth variant="standard" onChange={onChange} />
            </FormControl>

            <FormControl variant="standard" fullWidth>
              <TextField margin="dense" name="salePrice" label="Valor de revenda" type="number" fullWidth variant="standard" onChange={onChange} />
            </FormControl>

            <FormControl variant="standard" fullWidth>
              <TextField margin="dense" name="stockQuantity" label="Quantidade em estoque" type="number" fullWidth variant="standard" onChange={onChange} />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Fechar</Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Grid>
  )
}

export default ProductsList