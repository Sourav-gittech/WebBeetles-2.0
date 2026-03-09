import React, { useEffect, useState } from 'react'
import { Plus, Ticket } from "lucide-react";
import PromocodeRow from "./PromocodeRow";
import PromocodeModal from '../modal/PromocodeModal';
import SectionCard from '../../common/SectionCard';
import { useDispatch, useSelector } from 'react-redux';
import { addCode, fetchCodes, updateCode } from '../../../../redux/slice/promocodeSlice';

const Promocode = ({ toggleCharge, setOpenMarkModal, setChargeId, setType }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [editPromocode, setEditPromocode] = useState(null);

    const dispatch = useDispatch(),
        { isCodeLoading, isCodeStatusLoading, allCode, hasCodesError } = useSelector(state => state?.promocode);

    const savePromocode = (code) => {

        if (editPromocode) {
            const existCharge = allCharges?.filter(existch => existch?.name?.toLowerCase() == charge?.name?.toLowerCase());
            const removeCurrent = existCharge?.find(ch => ch?.id != editPromocode?.id);

            if (removeCurrent) {
                hotToast('Promocode already exist!', "info");
                setModalOpen(false);
            }
            else {
                dispatch(updateCode({ id: editPromocode?.id, updatedData: code }))
                    .then(res => {
                        // console.log('Response for updating promocode', res);

                        if (res.meta.requestStatus === "fulfilled") {
                            setModalOpen(false);
                            setEditPromocode(null);
                            dispatch(fetchCodes());
                            hotToast('Promocode updated successfully!', "success");
                        }
                    })
                    .catch(err => {
                        console.log('Error occured', err);
                        getSweetAlert("Error", `Something went wrong while updating promocode.`, "error");
                    })
            }
        } else {
            const existCharge = allCode?.find(existch => existch?.name?.toLowerCase() == charge?.name?.toLowerCase());

            if (existCharge) {
                hotToast('Promocode already exist!', "info");
                setModalOpen(false);
            }
            else {
                dispatch(addCode({ ...charge, status: true }))
                    .then(res => {
                        // console.log('Response for adding promocode', res);

                        if (res.meta.requestStatus === "fulfilled") {
                            setModalOpen(false);
                            dispatch(fetchCodes());
                            hotToast('Promocode added successfully!', "success");
                        }
                    })
                    .catch(err => {
                        console.log('Error occured', err);
                        getSweetAlert("Error", `Something went wrong while adding promocode.`, "error");
                    })
            }
        }
    };

    const openEdit = (code) => {
        setEditPromocode(code);
        setModalOpen(true);
    };

    useEffect(() => {
        dispatch(fetchCodes())
            .then(res => {
                // console.log('Response for fetching all courses', res);
            })
            .catch(err => {
                console.log('Error occured', err);
            });
    }, [dispatch]);

    console.log('All available promocodes', allCode);

    return (
        <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-6 h-[480px] overflow-y-auto">

            {/* Header */}
            <SectionCard icon={Ticket} title="Promo Codes & Discounts"></SectionCard>

            {/* List */}
            <div className="space-y-3">

                {allCode?.map(promocode => (
                    <PromocodeRow key={promocode?.id} promocode={promocode} toggleCharge={toggleCharge} openEdit={openEdit}
                        setOpenMarkModal={setOpenMarkModal} setChargeId={setChargeId} setType={setType} />
                ))}

                {/* Add button */}
                <button
                    onClick={() => setModalOpen(true)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-2 rounded-xl cursor-pointer"
                >
                    <Plus size={16} className="inline mr-1 mb-0.5" />
                    Add Promocode
                </button>

            </div>

            <PromocodeModal isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditPromocode(null); }}
                onSave={savePromocode}
                editData={editPromocode} isCodeLoading={isCodeLoading} />

        </div>
    );
};

export default Promocode;