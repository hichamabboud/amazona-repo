import React from 'react';
import data from '../../utils/data';
import { useRouter } from 'next/router';
import {
	Card,
	Typography,
	Link,
	Grid,
	List,
	ListItem,
	Button,
} from '@material-ui/core';
import Layout from '../../components/Layout';
import NextLink from 'next/link';
import useStyles from '../../utils/styles';
import Image from 'next/image';
import db from '../../utils/db';
import Product from '../../models/Product';

export default function ProductScreen(props) {
	const { product } = props;

	const classes = useStyles();

	if (!product) {
		return <div> No product found </div>;
	}

	return (
		<Layout title={product.name} description={product.description}>
			<div className={classes.section}>
				<NextLink href="/" passHref>
					<Link>
						<Typography>Return to products</Typography>
					</Link>
				</NextLink>

				<Grid container spacing={1} className={classes.section}>
					<Grid item md={6} xs={12}>
						<Image
							src={product.image}
							alt={product.name}
							width={640}
							height={640}
							layout="responsive"></Image>
					</Grid>

					<Grid item md={3} xs={12}>
						<List>
							<ListItem>
								<Typography variant="h5" component="h1">
									{product.name}
								</Typography>
							</ListItem>

							<ListItem>
								<Typography>
									<b>Category</b> : {product.category}
								</Typography>
							</ListItem>

							<ListItem>
								<Typography>
									<b> Brand </b>: {product.brand}
								</Typography>
							</ListItem>

							<ListItem>
								<Typography>
									<b> Rating </b>: {product.rating}/5 ({product.numReviews}{' '}
									reviews)
								</Typography>
							</ListItem>
							<ListItem>
								<Typography>
									<b> Description </b>: {product.description}
								</Typography>
							</ListItem>
						</List>
					</Grid>

					<Grid item md={3} xs={12}>
						<Card>
							<List>
								<ListItem>
									<Grid container>
										<Grid item xs={6}>
											<Typography> Price </Typography>
										</Grid>
										<Grid item xs={6}>
											<Typography>${product.price}</Typography>
										</Grid>
									</Grid>
								</ListItem>

								<ListItem>
									<Grid container>
										<Grid item xs={6}>
											<Typography> Status </Typography>
										</Grid>
										<Grid item xs={6}>
											<Typography>
												{product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
											</Typography>
										</Grid>
									</Grid>
								</ListItem>

								<ListItem>
									<Button fullWidth variant="contained" color="primary">
										Add to cart
									</Button>
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { params } = context;
	const { slug } = params;

	await db.connect();

	const product = await Product.findOne({ slug }).lean();

	await db.disconnect();

	return {
		props: {
			product: db.convertDocToObj(product),
		},
	};
}
