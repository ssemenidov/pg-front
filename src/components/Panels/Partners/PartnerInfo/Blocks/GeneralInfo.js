import React from "react";
import InputAnchor from "../../../../Inputs/InputAnchor";
import Multiline from "../../../../Inputs/Multiline";
import SelectAnchor from "../../../../Inputs/SelectAnchor";
import {BlockBody, Medium, Row, Column, BlockTitle, InputTitle} from "../../../../Styles/StyledBlocks"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiOutlinedInput-multiline": {
            height: 123,
            width:"100%",
        },
    },
}));



export default function GeneralInfo() {
    const classes = useStyles();
    return (
        <Medium>
            <BlockTitle>
                Общая информация
            </BlockTitle>
            <BlockBody>
                <form action="" className={classes.root} >
                <Row>
                    <Column>
                        <Row>
                            <Column
                                style={{width: "45%", marginBottom: '21px'}}>
                                <div style={{width: "100%"}}>
                                    <InputTitle>
                                        Наименование контрагента
                                    </InputTitle>
                                    <SelectAnchor
                                        placeholder="Контрагент"
                                    />
                                </div>
                                <div style={{width: "100%"}}>
                                    <InputTitle>
                                        Наименование контрагента
                                    </InputTitle>
                                    <InputAnchor
                                        placeholder="Производство напитков"
                                    />
                                </div>

                            </Column>

                            <Column
                                style={{width: "45%", marginBottom: '21px',   }}>
                                <InputTitle>
                                    Комментарий
                                </InputTitle>

                                <Multiline
                                    style={{ width: "100%"}}
                                    inputProps={{maxLength: 450, rows: 186, cols: 10}}
                                />
                            </Column>
                        </Row>


                    </Column>
                </Row>
                <Row>
                    <Column style={{width: "45%", marginBottom: '21px'}}>
                        <div style={{width: "100%"}}>
                            <InputTitle>
                                Сектор деятельности
                            </InputTitle>

                            <InputAnchor
                                placeholder="Сектор"
                            />
                        </div>
                    </Column>
                    <Column style={{width: "45%", marginBottom: '21px'}}>
                        <div style={{width: "100%"}}>
                            <InputTitle>
                                Тип клиента
                            </InputTitle>
                            <InputAnchor
                                placeholder="Сектор"
                            />
                        </div>
                    </Column>
                </Row>
                </form>
            </BlockBody>
        </Medium>
    )
};