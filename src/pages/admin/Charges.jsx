import React, { useState } from 'react'
import Promocode from '../../components/admin/charge/promocode/Promocode';
import ChargeHeader from '../../components/admin/charge/tax/ChargeHeader';
import ChargeManager from '../../components/admin/charge/tax/ChargeManager';
import ConfirmStatusModal from '../../components/admin/common/modal/ConfirmStatusModal';
import { deleteCharge, fetchCharges, updateChargeStatus } from '../../redux/slice/chargesSlice';
import hotToast from '../../util/alert/hot-toast';
import getSweetAlert from '../../util/alert/sweetAlert';
import { useDispatch, useSelector } from 'react-redux';

const Charges = () => {

    const [openMarkModal, setOpenMarkModal] = useState(false);
    const [chargeId, setChargeId] = useState(null);
    const [type, setType] = useState(null);

    const dispatch = useDispatch(),
        { isChargesLoading, allCharges, hasChargesError } = useSelector(state => state?.charge);

    const toggleCharge = (id, updateStatus) => {
        dispatch(updateChargeStatus({ id, updateStatus }))
            .then(res => {
                // console.log('Response for changing charges status', res);

                if (res.meta.requestStatus === "fulfilled") {
                    hotToast(`Charge ${updateStatus ? 'activated' : 'blocked'} successfully!`, "success");
                }
            })
            .catch(err => {
                console.log('Error occured', err);
                getSweetAlert("Error", `Something went wrong while updating charge status.`, "error");
            })
    };

    const deleteChargeFn = () => {
        dispatch(deleteCharge(chargeId))
            .then(res => {
                // console.log('Response for deleting charges', res);

                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(fetchCharges());
                    hotToast('Charge deleted successfully!', "success");
                    setOpenMarkModal(false);
                }
            })
            .catch(err => {
                console.log('Error occured', err);
                getSweetAlert("Error", `Something went wrong while deleting charge.`, "error");
            })
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <ChargeHeader />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main Settings */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tax & GST */}
                        <ChargeManager toggleCharge={toggleCharge} setOpenMarkModal={setOpenMarkModal} setChargeId={setChargeId} setType={setType} />

                        {/* Promo Codes */}
                        <Promocode toggleCharge={toggleCharge} setOpenMarkModal={setOpenMarkModal} setChargeId={setChargeId} setType={setType} />
                    </div>
                </div>
            </div>
            {openMarkModal && (
                <ConfirmStatusModal setOpenMarkModal={setOpenMarkModal} handleMark={type == 'charge' ? deleteChargeFn : null} isLoading={type == 'charge' ? isChargesLoading : null}
                    title={`Delete ${type}`} subTitle={`Are you sure you want to delete the ${type}`} />
            )}
        </>
    )
}

export default Charges