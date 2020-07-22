import React from "react";
import {Form, FormGroup, Input, Label, Row} from "reactstrap";
import {takeValueInput} from "../../../../../store/action";
import {connect} from "react-redux";


const NewAndAllBlockInput = (props) => {
    console.log(props.infoForm)
    return (<>
            {(props.error.length !== 0)? <h1>{props.error.error}</h1>:null}
            <Form action="" className="form_all_input start_link ">
                <FormGroup style={{display: "flex"}}>
                    <Row className="form_action form_info">
                        <Label className="title_info">Общая информация</Label>
                        <label className="form-groups">
                            <label className="title_boom_input" style={{display: "flex"}}>
                                <label>
                                    <Label className="search_params">Наименование контрагента</Label>
                                    <label className="search_params_input">
                                        <input type="email"
                                               className="
                                           input_search_img
                                           input_search_case
                                           f-control
                                           input_icon"
                                               placeholder="Юниверсал ТОО"
                                               aria-describedby="emailHelp"
                                               name="namePartner"
                                               onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}
                                        />
                                    </label>
                                    <Label className="search_params">Сектор деятельности
                                        <select className="
                                            form-control
                                            input_search_img
                                            input_search_anchor
                                            input_icon"
                                                name="sectorActivity"
                                                onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}
                                        >
                                            <option value="#">Производство напитков</option>
                                            <option value="#">Производство напитков2</option>
                                        </select>
                                    </Label>
                                </label>
                                <Label className=" search_params_textarea search_params">
                                    Комментарий
                                    <Input type="textarea"
                                           className="
                                          input_search_img
                                          textArea_width
                                          text_area_search_params"
                                           placeholder="..."
                                           onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}
                                           name="commentPartner"
                                    />
                                </Label>
                            </label>
                            <label className="form_group_input">
                                <Label className="search_params">
                                    Тип контрагента
                                    <select
                                        className="
                                    form-control
                                    input_search_img
                                    input_search_anchor
                                    search_params_input
                                    input_icon"
                                        name="typePartner"
                                        onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}
                                    >
                                        <option> Рекламодатель</option>
                                        <option> Рекламное агентсво</option>
                                        <option> Поставщик</option>
                                    </select>
                                </Label>
                                <label className="search_params_textarea boom_input search_params search_params_input">

                                    Тип клиента
                                    <input type="email"
                                           className="
                                           input_search_img
                                           input_search_anchor
                                           form-control
                                           input_icon"
                                           placeholder="По личным связям"
                                           name="typeClient"
                                           onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                                    />
                                </label>
                            </label>
                        </label>
                    </Row>
                    <Label className="form_action form_address">
                        <Label className="title_info">Адрес</Label>
                        <Label className="form-groups-address">
                            <label className=" search_params search_params_input">
                                Город
                                <input type="email"
                                       className="
                                   input_search_img
                                   input_search_globe
                                   form-control
                                   input_icon"
                                       placeholder="Алматы"
                                       name="cityPartner"

                                       onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                                />
                            </label>
                            <Label className="input_block">
                                <label className=" search_params search_params_input">
                                    Район
                                    <input type="email"
                                           className="
                                       input_search_img
                                       input_search_directions
                                       form-control
                                       more_width_input"
                                           placeholder="Медеуский р-н."
                                           name="districtPartner"

                                           onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                                    />
                                </label>
                                <label className="
                            search_params
                            search_params_input
                            postCode">Почтовый индек
                                    <select className="
                                        form-group
                                        input_search_img
                                        input_search_envelope
                                        form-control more_width_input"
                                            name="postIndex"
                                            onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}
                                    >
                                        <option value="#">1254789</option>
                                        <option value="#">987456321</option>

                                    </select>
                                </label>
                            </Label>
                            <label className=" search_params search_params_input">
                                Юридический адрес
                                <input type="email"
                                       className="
                                   input_search_img
                                   input_search_house
                                   form-control input_icon"
                                       placeholder="пр.Достык 25, офис 52"
                                       name="legalAddress"

                                       onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                                />
                            </label>
                            <label className=" search_params search_params_input">
                                Фактический адрес
                                <input type="email"
                                       className="
                                   input_search_img
                                   input_search_house
                                   form-control input_icon"
                                       placeholder="пр.Достык 25, офис 52"
                                       name="factAddress"

                                       onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                                />
                            </label>
                        </Label>

                    </Label>
                    <Label className="form_action form_bank" style={{width: "19.8%"}}>
                        <label className="title_info">Бансковский счет</label>
                        <Label className="form-groups-bank">
                            <label className=" search_params search_params_input">
                                Банк получателя
                                <input type="email"
                                       className="
                                   input_search_img
                                   input_search_anchor
                                   form-control input_icon"
                                       placeholder="АО «Банк получателя» "
                                       name="payeesBank"

                                       onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                                />
                            </label>
                            <label className="  search_params search_params_input">
                                ИИК
                                <input type="email"
                                       className="
                                   input_search_img
                                   input_search_anchor
                                   form-control input_icon"
                                       placeholder="KZ 1578964523000215648"
                                       name="IIK"

                                       onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                                />
                            </label>
                            <label className=" search_params search_params_input">
                                БИК
                                <input type="email"
                                       className="
                                   input_search_img
                                   input_search_anchor
                                   form-control input_icon"
                                       placeholder="SROMYTRS"
                                       name="BIK"

                                       onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                                />
                            </label>
                            <label className="search_params search_params_input">
                                КБЕ
                                <input type="email"
                                       className="
                                   input_search_img
                                   input_search_anchor
                                   form-control input_icon"
                                       placeholder="SROMYTRS"
                                       name="KBE"

                                       onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                                />
                            </label>
                        </Label>

                    </Label>
                </FormGroup>
                <FormGroup className=" form_action form_info_contact_face">
                    <label className="contact_face_title">
                        <label className="
                    contact_face_title
                    title_info
                     contact_face_title_text">Контактное лицо</label>
                        <button className="
                    counterparty_Header_Button_edit
                    button_contact_face">Добавить еще
                        </button>
                    </label>
                    <label className="
                    form-groups-contact-face
                    agent_style"
                           style={{display: "flex", flexFlow: "column"}}
                    >
                        <label className="agent_form">
                            <label className="
                        contact_face_inputs
                        search_params
                        search_params_input">
                                ФИО
                                <input type="email"
                                       className="
                                   input_search_img
                                    input_search_anchor
                                     form-control input_icon"
                                       placeholder="Гордеев Амровский "
                                       name="contactFaceFullName1"
                                    // onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}
                                />
                            </label>
                            <label className="
                                contact_face_inputs
                                search_params
                                search_params_input">
                                Телефон
                                <input type="email"
                                       className="
                                           input_search_img
                                           input_search_anchor
                                           form-control input_icon"
                                       placeholder="+7-(745)-523-65-48"
                                       name="contactFaceNumber1"
                                    // onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}
                                />
                            </label>

                            <label className="
                                    contact_face_inputs
                                    search_params
                                    search_params_input">
                                Email
                                <input type="email"
                                       className="
                                   input_search_img
                                   input_search_anchor
                                   form-control
                                   input_icon"
                                       placeholder="hello@mail.kz"
                                       name="contactFaceEmail1"
                                    // onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                                />
                            </label>
                            <label className="
                        contact_face_inputs
                        label_button_trash">
                                <a href="/#" className="button_trash">
                                    <img src={require("../../../../../img/partners/bx-trash.svg")} alt=""/>
                                </a>
                            </label>
                        </label>
                        <label className="agent_form">
                            <label className="
                        contact_face_inputs
                         search_params
                         search_params_input">
                                ФИО
                                <input type="email"
                                       className="
                                   input_search_img
                                   input_search_anchor
                                   form-control input_icon"
                                       placeholder="Гордеев Амровский "
                                       name="contactFaceFullName2"
                                    // onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                                />
                            </label>
                            <label className="
                                 contact_face_inputs
                                 search_params
                                 search_params_input">
                                Телефон
                                <input type="email"
                                       className="
                                    input_search_img
                                    input_search_anchor
                                    form-control input_icon"
                                       placeholder="+7-(745)-523-65-48"
                                       name="contactFaceNumber2"
                                    // onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                                />
                            </label>
                            <label className="
                        contact_face_inputs
                        search_params
                        search_params_input">
                                Email
                                <input type="email"
                                       className="
                                   input_search_img
                                   input_search_anchor
                                   form-control input_icon"
                                       placeholder="hello@mail.kz"
                                       name="contactFaceEmail1"
                                    // onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                                />
                            </label>
                            <label className="
                        contact_face_inputs
                        label_button_trash">
                                <a href="/#" className="button_trash">
                                    <img src={require("../../../../../img/partners/bx-trash.svg")} alt=""/>
                                </a>
                            </label>

                        </label>
                    </label>
                </FormGroup>
                <FormGroup className="
            form_action
            form_info_contact_face
            form_typeAk
            ">
                    <label className="
                contact_face_title
                title_info
                contact_face_title_text">Агентская коммисия </label>
                    <label className="
                form-group-contact-face
                agent_style
                agent_commission
                ">
                        <label className="
                        contact_face_inputs
                        search_params ">Тип АК
                            <select
                                className="
                                     form-group
                                      input_search_img
                                      input_search_anchor
                                      form-control"
                                // onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}
                            >
                                <option value="#">В процентах</option>

                            </select>
                        </label>
                        <label className="
                        contact_face_inputs
                         search_params
                         search_params_input">
                            Агентская коммисия
                            <input type="email"
                                   className="
                                   input_search_img
                                   input_search_anchor
                                    form-control"
                                   placeholder="10"
                                   name="agentCommission"
                                // onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}

                            />
                        </label>
                        <label className="
                        contact_face_inputs
                        search_params
                        search_params_input">
                            Ак распространяется
                            <input type="email"
                                   className="
                                   input_search_img
                                   input_search_anchor
                                   form-control"
                                   placeholder="На сумму без НДС"
                                   name="agentNDS"
                                // onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}
                            />
                        </label>
                        <Label className="contact_face_inputs search_params"
                               style={{marginRight: "11px"}}>
                            На какие услуги рассматриваются АК
                            <select className="
                                    form-group
                                    input_search_img
                                    input_search_anchor
                                    form-control"
                                // onChange={(e) => props.onFormCreated(e.target.name, e.target.value)}
                            >
                                <option value="#">Печать монтаж</option>
                            </select>
                        </Label>
                    </label>
                </FormGroup>
            </Form>
        </>
    )
}
const mapStateToProps = state => {
    return {
        infoForm: state.table.infoForm,
        error: state.table.error,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFormCreated: (name, value) => dispatch(takeValueInput(name, value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewAndAllBlockInput)
