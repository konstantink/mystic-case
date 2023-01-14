import getSlug from "speakingurl";
import _ from "lodash";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import AddOutlined from "@mui/icons-material/AddOutlined";
import Check from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Unstable_Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import DropField from "./DropField";
import StyledSwitch from "./StyledSwitch";
import Variants, { Option, OptionValue } from "./Variants";
import * as api from "../../api/api";
import {
    Difference,
    DisplayIntervalOption,
    Errors,
    Interval,
    IntervalOption,
    OptionType,
    OptionValueType,
    Price,
    PriceType,
    ProductItem,
    ProductImage
} from "../../types";

interface PriceFieldProps {
    fullWidth?: boolean;
    margin?: "normal" | "none" | "dense" | undefined;
    maxWidth?: string;
    price?: string;
    setPrice: (price: string) => void;
}

export const PriceField = ({ fullWidth = true, margin = "normal", maxWidth = "150px", price = "", setPrice }: PriceFieldProps) => {
    const ref = React.useRef<HTMLInputElement>(null);
    const [cursor, setCursor] = React.useState<number | null>(null);

    const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^(\\d*\\.?\\d?\\d?)\\d*$"/;
        const result = regex.exec(e.target.value);
        if (regex.test(e.target.value) && result) {
            setPrice(result[1]);
            setCursor(e.target.selectionStart);
        }
    };

    React.useEffect(() => {
        const input = ref.current;
        if (input) input.setSelectionRange(cursor, cursor);
    }, [cursor]);

    return (
        <TextField
            fullWidth={fullWidth}
            InputProps={{
                startAdornment: <InputAdornment position="start">&pound;</InputAdornment>,
            }}
            inputProps={{
                inputMode: "tel",
                pattern: "[0-9.]*",
                style: {
                    fontFamily: "Pangram",
                },
            }}
            inputRef={ref}
            label="Price"
            margin={margin}
            size="small"
            sx={!fullWidth
                ? {
                    maxWidth,
                }
                : {}}
            type="tel"
            value={price}
            onChange={onPriceChange}
        />
    );
};

export interface CustomIntervalFieldProps {
    interval: IntervalOption;
    intervalCount: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onSelectChange(e: SelectChangeEvent): void;
}

export const CustomIntervalField = ({ interval, intervalCount, onChange, onSelectChange }: CustomIntervalFieldProps) => {
    return (
        <Box
            component="div"
            sx={{
                alignItems: "center",
                border: "1px solid rgba(0, 0, 0, 0.54)",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "row",
                height: "40px",
                mb: "10px",
                pl: "8px",
            }}
        >
            <Typography variant="body1" sx={{ fontFamily: "inherit", fontSize: "10pt" }}>
                every
            </Typography>
            <InputBase
                inputProps={{
                    sx: {
                        p: 1,
                        textAlign: "center",
                    },
                }}
                sx={{
                    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
                    flex: 1,
                    height: "40px",
                    ml: 1,
                    right: "-2px",
                    "&.Mui-focused": {
                        border: "2px solid rgba(25, 118, 210, 1)",
                        borderRadius: "4px",
                        // height: "27px"
                    },
                }}
                value={intervalCount}
                onChange={onChange}
            />
            <Select
                inputProps={{
                    name: "customBillingPeriod",
                }}
                MenuProps={{
                    MenuListProps: {
                        sx: {
                            "& li": {
                                fontFamily: "Pangram",
                                fontSize: "10pt",
                            },
                        },
                    },
                }}
                sx={{
                    fontSize: "10pt",
                    height: "40px",
                    right: "-1px",
                    width: "100px",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderBottomLeftRadius: "4px",
                        borderColor: "rgba(25, 118, 210, 1)",
                        borderTopLeftRadius: "4px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                    },
                    "&:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                }}
                value={interval as string}
                onChange={onSelectChange}
            >
                <MenuItem value="day">days</MenuItem>
                <MenuItem value="week">weeks</MenuItem>
                <MenuItem value="month">months</MenuItem>
                <MenuItem value="year">years</MenuItem>
            </Select>
        </Box>
    );
};

export interface PriceFormProps {
    direction?: "row" | "column";
    prices?: Array<Price>;
    onAddPrice(): void;
    onIntervalChange(idx: number): (event: SelectChangeEvent) => void;
    onIntervalCountChange(idx: number): (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDefaultChange(idx: number): (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => void;
    onPriceChange(idx: number): (price: string) => void;
    onTypeChange(idx: number): (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => void;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    "& .MuiToggleButtonGroup-grouped": {
        border: "1px solid rgba(0, 0, 0, 0.12)",
        margin: theme.spacing(1, 0),
        fontFamily: "Pangram",
        "&:not(:first-of-type)": {
            borderRadius: theme.shape.borderRadius,
            borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
            "&.Mui-selected": {
                borderColor: "rgba(0, 0, 0, 0.54)",
            },
        },
        "&:first-of-type": {
            borderRadius: theme.shape.borderRadius,
            marginTop: theme.spacing(2),
        },
        "&.Mui-selected": {
            background: "none",
            borderColor: "rgba(0, 0, 0, 0.54)",
        },
    },
}));

const StyledToggleButton = styled(ToggleButton)(() => ({
    border: "1px solid rgba(0, 0, 0, 0.12)",
    fontFamily: "Pangram",
    "&.Mui-selected": {
        background: "none",
        border: "1px solid rgba(0, 0, 0, 0.54)",
    },
}));

export const PriceForm = ({
    prices,
    onAddPrice,
    onIntervalChange,
    onIntervalCountChange,
    onDefaultChange,
    onPriceChange,
    onTypeChange,
}: PriceFormProps) => {
    return (
        <Box
            component="div"
            sx={{
                display: "block",
                fontFamily: "Pangram",
                gridTemplateColumns: "",
                "& .MuiTypography-root": {
                    fontFamily: "Pangram",
                },
            }}
        >
            {prices
                ? prices.map((price, idx) => (
                    <Grid container key={`price-field-${idx}`} spacing={2}>
                        <Grid xs={4}>
                            <PriceField
                                fullWidth
                                price={price.value?.toLocaleString()}
                                setPrice={onPriceChange(idx)}
                            />
                        </Grid>
                        <Grid xs={2}>
                            <StyledToggleButtonGroup
                                exclusive
                                size="small"
                                value={price.type.toString()}
                                onChange={onTypeChange(idx)}
                            >
                                <ToggleButton disableFocusRipple disableRipple value="0" aria-label="one-time">
                                One time
                                </ToggleButton>
                                <ToggleButton disableFocusRipple disableRipple value="1" aria-label="recurring">
                                Recurring
                                </ToggleButton>
                            </StyledToggleButtonGroup>
                        </Grid>
                        <Grid xs={3}>
                            <Box
                                component="div"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginTop: 2,
                                    width: "100%",
                                }}
                            >
                                <StyledToggleButton
                                    disableFocusRipple
                                    disableRipple
                                    size="small"
                                    value="true"
                                    selected={price.default}
                                    aria-label="default-price"
                                    onChange={!price.default ? onDefaultChange(idx) : undefined}
                                >
                                    {price.default
                                        ? (
                                            <Box component="span" sx={{ alignItems: "center", display: "flex" }}>
                                                <Check sx={{ color: "green", height: "22.75px", marginRight: 1, width: "22.75px" }} />
                                                <span>Default price</span>
                                            </Box>
                                        )
                                        : (
                                            <span>Set the price as default</span>
                                        )}
                                </StyledToggleButton>
                                {price.type === PriceType.Recurring
                                    ? (
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="billing-period">Billing period</InputLabel>
                                            <Select
                                                labelId="billing-period"
                                                id="billing-period-select"
                                                inputProps={{
                                                    name: "billingPeriod",
                                                }}
                                                label="Billing period"
                                                MenuProps={{
                                                    MenuListProps: {
                                                        sx: {
                                                            "& li": {
                                                                fontFamily: "Pangram",
                                                                fontSize: "10pt",
                                                            },
                                                        },
                                                    },
                                                }}
                                                margin="dense"
                                                size="small"
                                                sx={{
                                                    "& .MuiOutlinedInput-input": {
                                                        fontSize: "10pt",
                                                    },
                                                }}
                                                value={price.interval?.displayInterval}
                                                onChange={onIntervalChange(idx)}
                                            >
                                                <MenuItem value="day">Daily</MenuItem>
                                                <MenuItem value="week">Weekly</MenuItem>
                                                <MenuItem value="month">Monthly</MenuItem>
                                                <MenuItem value="year">Yearly</MenuItem>
                                                <MenuItem value="custom">Custom</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )
                                    : (
                                        null
                                    )}
                            </Box>
                        </Grid>
                        { price.interval && price.interval.displayInterval === "custom"
                            ? (
                                <Grid xs={3} sx={{ alignItems: "flex-end", display: "flex" }}>
                                    <CustomIntervalField
                                        interval={price.interval.interval}
                                        intervalCount={price.interval.intervalCount ? price.interval.intervalCount.toString() : ""}
                                        onChange={onIntervalCountChange(idx)}
                                        onSelectChange={onIntervalChange(idx)}
                                    />
                                </Grid>
                            )
                            : null }
                    </Grid>
                ))
                : (null)
            }
            <Button startIcon={<AddOutlined />} size="small" sx={{ fontFamily: "Pangram", fontSize: "10pt", padding: "4px 1px" }} onClick={onAddPrice}>
                Add Price
            </Button>
        </Box>
    );
};

export interface ProductFormProps {
    product?: ProductItem;
}

export default ({ product }: ProductFormProps) => {
    const navigate = useNavigate();

    const [isDirty, setDirty] = React.useState<boolean>(false);

    const [newProduct, updateProduct] = React.useState<ProductItem>(product
        ? _.omit(product, ["prices", "images"])
        : {
            id: undefined,
            name: "",
            slug: "",
            title: "",
            description: "",
            // prices: [],
            difficulty: 0,
            isFeatured: false,
            isNew: false,
            isBestseller: false,
            // images: [] as Array<ProductImage>,
            hasVariants: false,
            // variants: [] as Array<OptionType>,
            sku: "",
        } satisfies ProductItem);

    const emptyPrice: Price = {
        active: true,
        default: false,
        price: 0.0,
        currency: "GBP",
        type: 0,
        value: "",
    };

    const defaultInterval: Interval = {
        displayInterval: "month",
        interval: "month",
        intervalCount: 1,
    };

    const [prices, setPrices] = React.useState<Array<Price>>(product && product.prices
        ? product.prices.map(item => ({
            id: item.id,
            active: item.active,
            default: item.default,
            price: item.price,
            currency: item.currency,
            type: item.type,
            value: (item.price / 100.0).toString(), // .toLocaleString("en-GB", {minimumFractionDigits: 2, maximumFractionDigits: 2, style: "decimal"}),
            interval: item.interval ? { ...item.interval } : null,
        } as Price))
        : []);

    const [variants, setVariants] = React.useState<Array<OptionType>>([]);

    const [images, setImages] = React.useState<Array<ProductImage>>([]);

    const [errors, setErrors] = React.useState<Errors<ProductItem>>();

    const onProductChange = (arg:"value"|"checked" = "value") => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateProduct({ ...newProduct, [e.target.name]: e.target[arg] });
    };

    const onProductDifficultyChange = (e: SelectChangeEvent<number>) => {
        updateProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const onProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateProduct({ ...newProduct, name: e.target.value, slug: getSlug(e.target.value || "") });
    };

    const onAddPrice = () => {
        setPrices(prevState => [...prevState, emptyPrice]);
    };

    const onPriceChange = (idx: number) => (priceValue: string) => {
        const toChange = prices[idx];
        toChange.price = parseFloat(priceValue) * 100;
        toChange.value = priceValue;
        setPrices([...prices.slice(0, idx), toChange, ...prices.slice(idx + 1)]);
    };

    const onPriceTypeChange = (idx: number) => (event: React.MouseEvent<HTMLElement, MouseEvent>, priceType: string) => {
        setPrices(prevState => {
            const toChange = prices[idx];
            toChange.type = parseFloat(priceType);
            toChange.interval = parseFloat(priceType) ? defaultInterval : undefined;
            return [...prevState.slice(0, idx), toChange, ...prevState.slice(idx + 1)];
        });
    };

    const onPriceDefaultChange = (idx: number) => () => {
        setPrices(prevState => {
            return prevState.map((price, index) => ({ ...price, default: index === idx }));
        });
    };

    const onPriceIntervalChange = (idx: number) => (event: SelectChangeEvent) => {
        setPrices(prevState => {
            const toChange = prevState[idx];
            const { name, value } = event.target;
            if (name === "billingPeriod" && value === "custom") {
                toChange.interval = {
                    displayInterval: "custom",
                    interval: "month",
                    intervalCount: 2,
                };
            } else if (name === "customBillingPeriod") {
                toChange.interval = {
                    ...toChange.interval as Interval,
                    interval: value,
                };
            } else {
                toChange.interval = {
                    displayInterval: value as DisplayIntervalOption,
                    interval: value,
                    intervalCount: 1,
                };
            }
            return [...prevState.slice(0, idx), toChange, ...prevState.slice(idx + 1)];
        });
    };

    const onPriceIntervalCountChange = (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrices(prevState => {
            const toChange = prevState[idx];
            if (toChange.interval) {
                toChange.interval.intervalCount = parseFloat(event.target.value);
            }
            return [...prevState.slice(0, idx), toChange, ...prevState.slice(idx + 1)];
        });
    };

    const onVariantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked && newProduct.variants === undefined) {
            newProduct.variants = new Array<OptionType>();
        }
        updateProduct({ ...newProduct, hasVariants: e.target.checked });
    };

    const onAddOption = () => {
        setVariants([...variants, { name: "", values: [{} as OptionValueType] }]);
    };

    const onOptionRemove = (idx: number) => () => {
        setVariants([...variants.slice(0, idx), ...variants.slice(idx + 1)]);
    };

    const onAddOptionValue = (idx: number) => {
        const toChange = variants[idx];
        toChange.values.push({} as OptionValueType);
        setVariants([...variants.slice(0, idx), toChange, ...variants.slice(idx + 1)]);
    };

    const onOptionNameChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (newProduct.variants !== undefined) {
            const item = variants[idx];
            item.name = e.target.value;
            setVariants([
                ...variants.slice(0, idx),
                item,
                ...variants.slice(idx + 1)
            ]);
        }
    };

    const onOptionValueOverridePriceChange = (optionIdx: number) => (valueIdx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const item = variants[optionIdx];
        const value = item.values[valueIdx];
        value.overridePrice = e.target.checked;
        setVariants([...variants.slice(0, optionIdx), item, ...variants.slice(optionIdx + 1)]);
    };

    const onOptionValuePriceChange = (optionIdx: number) => (valueIdx: number) => (price: string) => {
        const item = variants[optionIdx];
        const value = item.values[valueIdx];
        value.price = price;
        setVariants([...variants.slice(0, optionIdx), item, ...variants.slice(optionIdx + 1)]);
    };

    const onOptionValueChange = (optionIdx: number) => (valueIdx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const item = variants[optionIdx];
        const value = item.values[valueIdx];
        value.value = e.target.value;
        setVariants([...variants.slice(0, optionIdx), item, ...variants.slice(optionIdx + 1)]);
    };

    const onFilesUploadedSuccess = (images: Array<ProductImage>) => {
        setImages(images);
    };

    const isPriceEqual = (initialPrice: Array<Price> = [], changedPrice: Array<Price> = []) => {
        const sortedInitialPrice = initialPrice.sort((l, r) => l.price - r.price || l.currency > r.currency ? 1 : l.currency === r.currency ? 0 : -1);
        const sortedChangedPrice = changedPrice.sort((l, r) => l.price - r.price || l.currency > r.currency ? 1 : l.currency === r.currency ? 0 : -1);

        return _.isEqual(sortedInitialPrice.map(item => _.pick(item, "price", "currency", "type", "interval", "intervalCount")),
            sortedChangedPrice.map(item => _.pick(item, "price", "currency", "type", "interval", "intervalCount")));
    };

    // const isImageEqual = (initialImage: Array<ProductImage> = [], changedImage: Array<ProductImage> = []) => {
    //     const sortedInitialImage = initialImage.sort((l, r) => l.id > r.id ? 1 : l.id === r.id ? 0 : -1);
    //     const sortedChangedImage = changedImage.sort((l, r) => l.id > r.id ? 1 : l.id === r.id ? 0 : -1);

    //     return _.isEqual(sortedInitialImage.map(item => _.pick(item, "id")),
    //         sortedChangedImage.map(item => _.pick(item, "id")));
    // };

    // const isVariantEqual = (initialVariant: Array<OptionType> = [], changedVariant: Array<OptionType> = []) => {
    //     const sortedInitialVariant = initialVariant;
    //     const sortedChangedVariant = changedVariant;

    //     return _.isEqual(sortedInitialVariant, sortedChangedVariant);
    // };

    const getDiff = <T extends object>(initial: T | Array<T> | undefined, changed: T | Array<T> | undefined): Difference<T> => {
        const diffs: Difference<T> = {
            created: [],
            updated: [],
            deleted: [],
        };

        const _getDiff = <Type extends object>(initial: Type | undefined, changed: Type | undefined): Type => {
            if (initial === changed === undefined) { return {} as Type; }
            if (initial === undefined) { return changed as Type; }
            if (changed === undefined) { return initial as Type; }
            // Don't know yet how to fix violation of any
            // eslint-disable-next-line
            const diff = _.transform(changed, (result: Type, value: any, key: keyof Type) => {
                if (value && value !== initial[key]) {
                    result[key] = value;
                }
                return result;
            }, {} as Type);
            console.log("Diff", diff);
            return diff;
        };

        if (initial && changed) {
            if (_.isArray(initial) && _.isArray(changed)) {
                const zipped = _.zip(initial, changed);
                if (zipped !== undefined) {
                    console.log("Zipped:", zipped);
                    diffs.updated = [];// .map((item: [T|undefined, T|undefined]) => _getDiff<T>(item[0], item[1]));
                }
                return diffs;
            }
            diffs.updated.push(_getDiff(initial as T, changed as T));
        } else if (initial === undefined && changed) {
            diffs.created = _.isArray(changed) ? changed : [changed];
        } else if (initial && changed === undefined) {
            diffs.deleted = _.isArray(initial) ? initial : [initial];
        }
        return diffs;
    };

    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        let response;
        e.preventDefault();

        if (product) {
            const productChanges = getDiff<ProductItem>(_.omit(product, "prices", "images", "variants"), newProduct);
            const pricesChanges = getDiff<Price>(product.prices, prices);
            const imagesChanges = getDiff<ProductImage>(product.images, images);
            response = await api.updateProduct({
                ...productChanges,
                prices: pricesChanges.updated,
                images: imagesChanges.updated,
            });
        } else {
            const toSave = {
                ...newProduct,
                prices,
                variants,
                images,
            };
            response = await api.createProduct(toSave);
        }
        if (response.success) {
            navigate("/admin/products");
        } else {
            setErrors(response.errors);
        }
    };

    React.useEffect(() => {
        if (product) {
            setDirty(!_.isEqual(product, newProduct) ||
                !isPriceEqual(product.prices, prices)
                // || !_.isEqual(product.images, images)
                // || !_.isEqual(product.variants, variants)
            );
            getDiff(product.prices, prices);
            // console.log(product, newProduct);
            // console.log("product === newProduct", _.isEqual(product, newProduct));
        } else {
            setDirty(true);
        }
    }, [newProduct, images, prices, variants]);

    return (
        <Box
            component="form"
            sx={{
                fontFamily: "Pangram",
                "& .MuiTypography-root": {
                    fontFamily: "Pangram",
                },
            }}
        >
            <Grid container spacing={2} sx={{ alignItems: "center" }}>
                <Grid xs={6}>
                    {product ? "Edit Product" : "Create a new Product"}
                </Grid>
                <Grid xs={6} sx={{ textAlign: "right" }}>
                    <FormGroup>
                        <FormControlLabel control={<StyledSwitch checked={newProduct.isFeatured} />} label="Published" labelPlacement="start" />
                    </FormGroup>
                </Grid>
            </Grid>

            <Grid container columns={{ md: 6, lg: 12 }} spacing={2} sx={{ maxHeight: 600 }}>
                <Grid md={6} lg={6} sx={{ height: "100%" }}>
                    <TextField
                        fullWidth
                        InputProps={{
                            sx: {
                                fontFamily: "Pangram",
                                fontSize: "14pt",
                            },
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
                        helperText={errors?.slug ? errors.slug : "This is the unique URL for your product on your shop"}
                        InputLabelProps={{
                            shrink: true,
                            sx: {
                                fontWeight: 600,
                                "&.Mui-disabled": {
                                    color: "rgba(0,0,0,0.6)",
                                },
                            },
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
                            name: "title",
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
                <Grid md={6} lg={6}>
                    <DropField images={newProduct.images} onUploadSuccess={onFilesUploadedSuccess} />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="difficulty-level">Difficulty level</InputLabel>
                        <Select
                            labelId="difficulty-level"
                            id="difficulty-level-select"
                            inputProps={{
                                name: "difficulty",
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
                            {[1, 2, 3, 4, 5].map(item => (
                                <MenuItem key={`difficulty-key-${item}`} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Stack direction="row" marginTop={2} justifyContent="space-between">
                <FormControl component="div" sx={{ width: "100%" }} variant="outlined">
                    <FormGroup row sx={{ justifyContent: "space-between", width: "100%" }}>
                        <FormControlLabel
                            control={<StyledSwitch checked={newProduct.isFeatured} inputProps={{ name: "isFeatured" }} onChange={onProductChange("checked")} />}
                            label="Is featured?"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<StyledSwitch checked={newProduct.isBestseller} inputProps={{ name: "isBestseller" }} onChange={onProductChange("checked")} />}
                            label="Is bestseller?"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<StyledSwitch checked={newProduct.isNew} inputProps={{ name: "isNew" }} onChange={onProductChange("checked")} />}
                            label="Is new?"
                            labelPlacement="start"
                        />
                    </FormGroup>
                    <FormHelperText>Priority of these flags goes from left to right, meaning the product will be shown as the most right turned on flag</FormHelperText>
                </FormControl>
            </Stack>
            <Divider sx={{ margin: "16px 0" }} />
            <PriceForm
                direction="row"
                prices={prices}
                onAddPrice={onAddPrice}
                onIntervalChange={onPriceIntervalChange}
                onIntervalCountChange={onPriceIntervalCountChange}
                onDefaultChange={onPriceDefaultChange}
                onPriceChange={onPriceChange}
                onTypeChange={onPriceTypeChange}
            />
            {/* <PriceField
                fullWidth
                price={prices[0].value?.toLocaleString()}
                setPrice={onPriceChange(0)}
            /> */}
            <Divider sx={{ margin: "16px 0" }} />
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <TextField
                        fullWidth
                        helperText="Set this field only if you do not have variations of the product"
                        inputProps={{
                            name: "sku",
                        }}
                        label="SKU"
                        margin="dense"
                        size="small"
                        value={newProduct.sku}
                        onChange={onProductChange("value")}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid xs={12}>
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
                                <Button startIcon={<AddOutlined />} size="small" sx={{ fontFamily: "Pangram", fontSize: "10pt", padding: "4px 1px" }} onClick={() => { onAddOptionValue(idx); }}>Add value</Button>
                            </Option>
                        ))}
                        <Button startIcon={<AddOutlined />} size="small" sx={{ fontFamily: "Pangram", fontSize: "10pt", padding: "4px 1px" }} onClick={() => { onAddOption(); }}>Add option</Button>
                    </Variants>
                </Grid>
            </Grid>
            <Divider sx={{ margin: "16px 0" }} />
            <Stack direction="row" flexDirection="row-reverse" sx={{ marginTop: 2, "& button:not(:last-of-type)": { marginLeft: 1 } }}>
                <Button variant="contained" disabled={!isDirty} onClick={onSubmit}>Save</Button>
                <Button variant="outlined" onClick={() => navigate("/admin/products")}>Cancel</Button>
            </Stack>
        </Box>
    );
};
