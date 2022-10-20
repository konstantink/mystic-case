import slug from "limax";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import AddOutlined from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import DropField from "./DropField";
import StyledSwitch from "./StyledSwitch";
import Variants, { Option, OptionValue } from "./Variants";
import * as api from "../../api/api";
import { Interval, IntervalOption, OptionType, OptionValueType, Price, ProductItem, ProductImage } from "../../types";


interface PriceFieldProps {
    fullWidth?: boolean;
    margin?: "normal" | "none" | "dense" | undefined;
    maxWidth?: string;
    price?: string;
    setPrice: (price: string) => void;
}

export const PriceField = ({ fullWidth=true, margin="normal", maxWidth="150px", price="", setPrice }: PriceFieldProps) => {
    const ref = React.useRef<HTMLInputElement>(null);
    const [cursor, setCursor] = React.useState<number | null>(null);

    const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = new RegExp("^(\\d*\\.?\\d?\\d?)\\d*$");
        const result = regex.exec(e.target.value);
        if (regex.test(e.target.value) && result) {
            setPrice(result[1]);
            setCursor(e.target.selectionStart);
        }
    }

    React.useEffect(() => {
        const input = ref.current;
        if (input) input.setSelectionRange(cursor, cursor);
    }, [cursor]);

    return (
    <TextField
        fullWidth={fullWidth}
        InputProps={{
            startAdornment: <InputAdornment position="start">&pound;</InputAdornment>
        }}
        inputProps={{
            inputMode: "tel",
            pattern: "[0-9.]*",
            style: {
                fontFamily: "Pangram",
            }
        }}
        inputRef={ref}
        label="Price"
        margin={margin}
        size="small"
        sx={!fullWidth ? {
            maxWidth: maxWidth,
        } : {}}
        type="tel"
        value={price}
        onChange={onPriceChange}
    />
)}

export default () => {
    const navigate = useNavigate();
    const [newProduct, updateProduct] = React.useState<ProductItem>({
        id: undefined,
        name: "",
        slug: "",
        title: "",
        description: "",
        prices: [],
        difficulty: 0,
        isFeatured: false,
        isNew: false,
        isBestseller: false,
        images: [] as Array<ProductImage>,
        hasVariants: false,
        variants: [] as Array<OptionType>,
    } as ProductItem);

    const [prices, setPrice] = React.useState<Array<Price>>([{
        price: "",
        currency: "GBP",
        type: 0,
    }]);

    const [variants, setVariants] = React.useState<Array<OptionType>>([]);

    const [images, setImages] = React.useState<Array<ProductImage>>([]);

    const [errors, setErrors] = React.useState<ProductItem>();

    const onProductChange = (arg:"value"|"checked"="value") => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateProduct({...newProduct, [e.target.name]: e.target[arg]})
    };

    const onProductDifficultyChange = (e: SelectChangeEvent<number>) => {
        updateProduct({...newProduct, [e.target.name]: e.target.value})
    };

    const onProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProduct({...newProduct, name: e.target.value, slug: slug(e.target.value || "")});
    }

    const onPriceChange = (idx: number) => (price: string) => {
        const toChange = prices[idx];
        toChange.price = price;
        setPrice([...prices.slice(0, idx), toChange, ...prices.slice(idx+1)]);
    }

    const onVariantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked && newProduct.variants === undefined) {
            newProduct.variants = new Array<OptionType>();
        }
        updateProduct({...newProduct, hasVariants: e.target.checked});
    }

    const onAddOption = () => {
        setVariants([...variants, {name: "", values: [{} as OptionValueType]}])
    }

    const onOptionRemove = (idx: number) => () => {
        setVariants([...variants.slice(0, idx), ...variants.slice(idx+1)])
    }

    const onAddOptionValue = (idx: number) => {
        const toChange = variants[idx];
        toChange.values.push({} as OptionValueType);
        setVariants([...variants.slice(0, idx), toChange,...variants.slice(idx+1)]);
    }

    const onOptionNameChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (newProduct.variants !== undefined) {
            const item = variants[idx];
            item.name = e.target.value;
            setVariants([
                ...variants.slice(0, idx),
                item,
                ...variants.slice(idx+1),
            ]);
        }
    }

    const onOptionValueOverridePriceChange = (optionIdx: number) => (valueIdx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const item = variants[optionIdx];
        const value = item.values[valueIdx];
        value.overridePrice = e.target.checked;
        setVariants([...variants.slice(0, optionIdx), item, ...variants.slice(optionIdx+1)]);
    }

    const onOptionValuePriceChange = (optionIdx: number) => (valueIdx: number) => (price: string) => {
        const item = variants[optionIdx];
        const value = item.values[valueIdx];
        value.price = price;
        setVariants([...variants.slice(0, optionIdx), item, ...variants.slice(optionIdx+1)])
    }

    const onOptionValueChange = (optionIdx: number) => (valueIdx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const item = variants[optionIdx];
        const value = item.values[valueIdx];
        value.value = e.target.value;
        setVariants([...variants.slice(0, optionIdx), item, ...variants.slice(optionIdx+1)])
    }

    const onFilesUploadedSuccess = (images: Array<ProductImage>) => {
        setImages(images);
    }

    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        newProduct.prices = prices.map(item => ({...item, price: parseFloat(item.price as string) * 100}));
        newProduct.variants = variants;
        newProduct.images = images;
        const response = await api.createProduct(newProduct);
        if (response.success) {
             navigate("/admin/products");
        } else {
            setErrors(response.errors);
        }
    }

    // React.useEffect(() => {
    //     console.log(newProduct);
    // }, [newProduct])

    return (
        <Box
            component="form"
            sx={{
                fontFamily: "Pangram",
                "& .MuiTypography-root": {
                    fontFamily: "Pangram", 
                }
            }}
        >
            <Grid container spacing={2} sx={{alignItems: "center"}}>
                <Grid item xs={6}>
                    Create a new Product
                </Grid>
                <Grid item xs={6} sx={{textAlign: "right"}}>
                    <FormGroup>
                        <FormControlLabel control={<StyledSwitch checked={newProduct.isFeatured} />} label="Published" labelPlacement="start" />
                    </FormGroup>
                </Grid>
            </Grid>

            <Grid container columns={{md: 6, lg: 12}} spacing={2} sx={{ maxHeight: 600 }}>
                <Grid item md={6} lg={6} sx={{height: "100%"}}>
                    <TextField 
                        fullWidth
                        InputProps={{
                            sx: {
                                fontFamily: "Pangram",
                                fontSize: "14pt",
                            }
                        }}
                        label="Product name" 
                        margin="normal"
                        size="medium"
                        onChange={onProductNameChange}
                        value={newProduct.name}
                    />
                    <TextField 
                        disabled
                        error={!!errors?.slug}
                        fullWidth 
                        helperText={!!errors?.slug? errors.slug: "This is the unique URL for your product on your shop"}
                        InputLabelProps={{
                            shrink: true,
                            sx: {
                                fontWeight: 600,
                                "&.Mui-disabled": {
                                    color: "rgba(0,0,0,0.6)",
                                },
                            }     
                        }}
                        label="slug"
                        margin="normal"
                        size="small"
                        value={newProduct.slug}
                    />
                    <TextField
                        disabled
                        fullWidth
                        helperText="You can link to this checkout URL from any existing site"
                        InputLabelProps={{
                            shrink: true,
                            sx: {
                                "&.Mui-disabled": {
                                    color: "rgba(0,0,0,0.6)",
                                },
                            },
                        }}
                        label="Checkout URL"
                        margin="normal"
                        size="small"
                        value=""
                    />
                    <TextField
                        fullWidth
                        helperText="Name that appears on all product listings as product name"
                        inputProps={{
                            name: "title"
                        }}
                        label="Product title"
                        margin="normal"
                        size="medium"
                        value={newProduct.title}
                        onChange={onProductChange("value")}
                    />
                    <TextField
                        fullWidth
                        inputProps={{
                            name: "description",
                        }}
                        multiline
                        label="Description"
                        margin="normal"
                        rows={7}
                        size="medium"
                        value={newProduct.description}
                        onChange={onProductChange("value")}
                    />
                </Grid>
                <Grid item md={6} lg={6}>
                    <DropField images={newProduct.images} onUploadSuccess={onFilesUploadedSuccess} />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="difficulty-level">Difficulty level</InputLabel>
                        <Select
                            labelId="difficulty-level"
                            id="difficulty-level-select"
                            inputProps={{
                                name: "difficulty"
                            }}
                            MenuProps={{
                                MenuListProps: {
                                    sx: {
                                        "& li": {
                                            fontFamily: "Pangram",
                                            fontSize: "12pt",
                                        },
                                    },
                                },
                            }}
                            margin="dense"
                            size="small"
                            sx={{
                                fontFamily: "Pangram",
                                fontSize: "12pt",
                            }}
                            value={newProduct.difficulty}
                            label="Difficulty level"
                            onChange={onProductDifficultyChange}
                        >
                            <MenuItem value={0}>N/A</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
                    <PriceField fullWidth price={prices[0].price as string} setPrice={onPriceChange(0)} />
                </Grid>
            </Grid>
            <Stack direction="row" marginTop={2} justifyContent="space-between">
                <FormControl component="div" sx={{width: "100%"}} variant="outlined">
                    <FormGroup row sx={{justifyContent: "space-between", width: "100%"}}>
                        <FormControlLabel 
                            control={<StyledSwitch checked={newProduct.isFeatured} inputProps={{name: "isFeatured"}} onChange={onProductChange("checked")} />} 
                            label="Is featured?" 
                            labelPlacement="start"
                        />
                        <FormControlLabel 
                            control={<StyledSwitch checked={newProduct.isBestseller} inputProps={{name: "isBestseller"}} onChange={onProductChange("checked")} />}
                            label="Is bestseller?"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<StyledSwitch checked={newProduct.isNew} inputProps={{name: "isNew"}} onChange={onProductChange("checked")} />}
                            label="Is new?"
                            labelPlacement="start"
                        />
                    </FormGroup>
                    <FormHelperText>Priority of these flags goes from left to right, meaning the product will be shown as the most right turned on flag</FormHelperText>
                </FormControl>
            </Stack>
            <Divider sx={{margin: "16px 0"}} />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        helperText="Set this field only if you do not have variations of the product"
                        inputProps={{
                            name: "sku"
                        }}
                        label="SKU"
                        margin="dense"
                        size="small"
                        value={newProduct.title}
                        onChange={onProductChange("value")}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Variants checked={!!newProduct.hasVariants} onCheckedChange={onVariantsChange}>
                        {variants !== undefined && variants.map((item, idx) => (
                            <Option 
                                key={`key-option-${idx}`} 
                                name={item.name}
                                onOptionNameChange={onOptionNameChange(idx)}
                                onOptionRemove={onOptionRemove(idx)}
                            >
                                {item.values !== undefined && item.values.map((option, optionIdx) => (
                                    <OptionValue 
                                        key={`key-option-value-${optionIdx}`} 
                                        {...option} 
                                        onOverridePriceChange={onOptionValueOverridePriceChange(idx)(optionIdx)} 
                                        onPriceChange={onOptionValuePriceChange(idx)(optionIdx)}
                                        onOptionValueChange={onOptionValueChange(idx)(optionIdx)}
                                    />
                                ))}
                                <Button startIcon={<AddOutlined />} size="small" sx={{fontFamily: "Pangram", fontSize: "10pt", padding: "4px 1px"}} onClick={() => {onAddOptionValue(idx)}}>Add value</Button>
                            </Option>
                        ))}
                        <Button startIcon={<AddOutlined />} size="small" sx={{fontFamily: "Pangram", fontSize: "10pt", padding: "4px 1px"}} onClick={() => {onAddOption()}}>Add option</Button>
                    </Variants>
                </Grid>
            </Grid>
            <Divider sx={{margin: "16px 0"}} />
            <Stack direction="row" flexDirection="row-reverse" sx={{marginTop: 2, "& button:not(:last-of-type)": {marginLeft: 1}}}>
                <Button variant="contained" onClick={onSubmit}>Save</Button>
                <Button variant="outlined" onClick={() => navigate("/admin/products")}>Cancel</Button>
            </Stack>
        </Box>
    )
}