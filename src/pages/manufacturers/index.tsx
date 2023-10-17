import { Button, Grid, Link, Typography } from "@mui/material";

const Manufacturers = () => {
    return (
        <Grid container spacing={2} >
            <Grid item xs={9}>
                <Typography variant='h5'>
                    <Link href='#'>
                        Fabricantes
                    </Link>
                </Typography>

                <Typography variant='body2'>Consulte, cadastre ou edite seus fabricantes.</Typography>
            </Grid>
            <Grid item xs={3} justifyContent="flex-end" alignItems="flex-start" >
                <Button size='large' type='submit' variant='outlined'>
                    Adicionar
                </Button>
            </Grid>
        </Grid>
    );
}

export default Manufacturers;