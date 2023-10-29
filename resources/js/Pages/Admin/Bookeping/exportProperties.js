import moment from "moment";

const exportProperties = (data, setData) => {
    const exportData = [];

    data.forEach((d) => {
        exportData.push({
            nama_meja: d.table_name || "-",
            total: d.total,
            bayar: d.pay,
            kembali: d.change,
            tanggal: moment(d.created_at).format("DD-MM-YYYY hh:mm:ss"),
        });
    });
    setData([...exportData]);
};

export default exportProperties;
