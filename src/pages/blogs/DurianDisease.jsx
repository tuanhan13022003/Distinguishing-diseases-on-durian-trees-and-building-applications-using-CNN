import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import algalLeafSpot from '../../assets/blogs/diseases/ALGAL_LEAF_SPOT.jpg';
import allocaridaraAttack from '../../assets/blogs/diseases/ALLOCARIDARA_ATTACK.jpg';
import healthyLeaf from '../../assets/blogs/diseases/HEALTHY_LEAF.jpg';
import leafAlgal from '../../assets/blogs/diseases/LEAF_ALGAL.jpg';
import leafBlight from '../../assets/blogs/diseases/LEAF_BLIGHT.jpg';
import leafColletotrichum from '../../assets/blogs/diseases/LEAF_COLLETOTRICHUM.jpg';
import leafRhizoctonia from '../../assets/blogs/diseases/LEAF_RHIZOCTONIA.jpg';
import leafSpot from '../../assets/blogs/diseases/LEAF_SPOT.jpg';
import phytophthoraLeafBlight from '../../assets/blogs/diseases/PHYTOPHTHORA_LEAF_BLIGHT.jpg';
import phytophthoraPalmivora from '../../assets/blogs/diseases/PHYTOPHTHORA_PALMIVORA.jpg';

function DurianDiseases() {
    const data = [
        {
            title: 'Algal Leaf Spot',
            image: algalLeafSpot,
            description: 'Algal Leaf Spot là bệnh do tảo gây ra, thường xuất hiện khi vườn trồng ẩm ướt, rậm rạp.',
            symptoms: 'Trên bề mặt lá xuất hiện các đốm tròn, màu xanh rêu hoặc nâu đỏ, sần sùi nhẹ. Vết bệnh thường nằm rải rác hoặc tập trung thành mảng lớn.',
            treatment: 'Cắt tỉa cành lá để vườn thông thoáng, phun thuốc chứa Copper Hydroxide, Bordeaux hoặc Zineb để diệt mầm bệnh.'
        },
        {
            title: 'Allocaridara Attack',
            image: allocaridaraAttack,
            description: 'Là sự tấn công của rầy mềm thuộc giống Allocaridara, phổ biến vào thời điểm cây ra đọt non.',
            symptoms: 'Lá bị cong queo, vàng úa, rụng sớm. Trên mặt lá thường có dịch mật ngọt thu hút nấm bồ hóng đen.',
            treatment: 'Phun thuốc trừ rầy như Fenobucarb hoặc Dimethoate theo chu kỳ 5–7 ngày/lần, đặc biệt khi cây đang ra lộc non.'
        },
        {
            title: 'Healthy Leaf',
            image: healthyLeaf,
            description: 'Hình ảnh minh họa lá khỏe mạnh – điều kiện lý tưởng cho sự phát triển và ra trái tốt của sầu riêng.',
            symptoms: 'Lá có màu xanh đậm, bề mặt bóng, không có đốm hoặc vết tổn thương.',
            treatment: 'Bón phân hữu cơ định kỳ, đảm bảo cây đủ nước, ánh sáng và không bị sâu bệnh gây hại.'
        },
        {
            title: 'Leaf Algal',
            image: leafAlgal,
            description: 'Leaf Algal là hiện tượng tảo phát triển ở mặt trên lá, làm giảm khả năng quang hợp và gây suy kiệt.',
            symptoms: 'Lá có các đốm tròn màu nâu đỏ, thường xuất hiện vào mùa mưa hoặc nơi thiếu ánh sáng.',
            treatment: 'Phun Copper Oxychloride hoặc Zineb định kỳ. Giữ khoảng cách trồng hợp lý, cắt lá già sớm.'
        },
        {
            title: 'Leaf Blight',
            image: leafBlight,
            description: 'Leaf Blight là bệnh phổ biến do nấm, gây cháy và rụng lá hàng loạt nếu không xử lý kịp thời.',
            symptoms: 'Mép lá úa vàng dần, sau đó lan vào giữa lá, làm lá khô và rụng.',
            treatment: 'Phun propiconazole, azoxystrobin hoặc mancozeb luân phiên. Cắt bỏ và tiêu hủy lá bệnh.'
        },
        {
            title: 'Leaf Colletotrichum',
            image: leafColletotrichum,
            description: 'Do nấm Colletotrichum spp. gây ra, bệnh tấn công chủ yếu vào lá già hoặc lá yếu.',
            symptoms: 'Đốm tròn nâu, trung tâm nhạt màu và có viền đậm. Vết bệnh lan nhanh ra toàn lá.',
            treatment: 'Dùng thuốc trừ nấm có hoạt chất Mancozeb, Thiophanate-methyl hoặc Carbendazim theo liều khuyến cáo.'
        },
        {
            title: 'Leaf Rhizoctonia',
            image: leafRhizoctonia,
            description: 'Rhizoctonia là nấm đất gây bệnh nặng trên lá non và đọt trong mùa mưa.',
            symptoms: 'Ngọn cây co rút, mép lá thối mềm, ngọn héo và khô dần.',
            treatment: 'Vệ sinh tán cây, phun Hexaconazole hoặc Validamycin. Không tưới quá ẩm, đảm bảo thoát nước tốt.'
        },
        {
            title: 'Leaf Spot',
            image: leafSpot,
            description: 'Leaf Spot là nhóm bệnh do nhiều loài nấm gây ra, xuất hiện phổ biến trong vườn có độ ẩm cao.',
            symptoms: 'Xuất hiện đốm tròn hoặc bất định màu nâu đậm, có thể có quầng sáng xung quanh.',
            treatment: 'Cắt lá bệnh, phun thuốc chứa Copper Oxychloride hoặc neem oil 7 ngày/lần trong 2–3 đợt.'
        },
        {
            title: 'Phomopsis Leaf Spot',
            image: null, // chưa có ảnh
            description: 'Do nấm Phomopsis sp. gây ra, thường gặp trên cây già hoặc cây bị suy yếu.',
            symptoms: 'Đốm vàng chuyển nâu ở đầu lá, sau đó trung tâm khô giòn, dễ gãy vụn.',
            treatment: 'Cắt bỏ phần lá bệnh, phun Benomyl hoặc Captan, kết hợp với bón phân phục hồi cây.'
        },
        {
            title: 'Phytophthora Leaf Blight',
            image: phytophthoraLeafBlight,
            description: 'Bệnh do nấm Phytophthora gây ra, xuất hiện mạnh vào mùa mưa hoặc nơi ngập úng.',
            symptoms: 'Lá bị cháy từ mép vào trong, vùng bệnh ẩm, có mùi thối nhẹ.',
            treatment: 'Phun Fosetyl-Al hoặc Metalaxyl đều lên tán và thân cây, kết hợp thoát nước tốt cho vườn.'
        },
        {
            title: 'Phytophthora Palmivora',
            image: phytophthoraPalmivora,
            description: 'Là tác nhân chính gây thối gốc và trái non sầu riêng, có tốc độ lây lan nhanh.',
            symptoms: 'Gốc thân chảy nhựa đen, vỏ thân nứt nẻ và chuyển sang màu nâu đen, trái non rụng sớm.',
            treatment: 'Quét thuốc chứa Phosphorous acid lên vết bệnh, phun Metalaxyl quanh gốc và tán cây.'
        }
    ];

    return (
        <Box sx={{ ml: 25, mr: 40, pt: 4, fontFamily: 'Segoe UI, sans-serif', lineHeight: 1.7, color: '#333' }}>
            <Typography variant="h3" gutterBottom sx={{ color: '#2e7d32', textAlign: 'left' }}>
                10 Bệnh Thường Gặp Ở Cây Sầu Riêng Và Cách Điều Trị
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
                Cây sầu riêng là loại cây trồng mang lại giá trị kinh tế cao nhưng cũng rất dễ mắc nhiều loại bệnh. Dưới đây là các bệnh phổ biến cùng triệu chứng và biện pháp điều trị giúp nhà vườn chủ động phòng trừ.
            </Typography>

            {data.map((item, index) => (
                <Box key={index} sx={{ mt: 6 }}>
                    <Typography variant="h5" sx={{ color: '#2e7d32' }}>
                        {index + 1}. {item.title}
                    </Typography>
                    {item.image && (
                        <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: '400px', borderRadius: '8px', margin: '16px 0' }}
                        />
                    )}
                    <Typography sx={{ mb: 1 }}>
                        <strong>Mô tả:</strong> {item.description}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Triệu chứng:</strong> {item.symptoms}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Biện pháp điều trị:</strong> {item.treatment}
                    </Typography>
                </Box>
            ))}
            <Typography>
                <h3>
                    <Link to="/products" style={{ color: '#1e88e5', textDecoration: 'underline' }}>
                     Xem sản phẩm thuốc điều trị tại đây
                </Link>
               </h3>
            </Typography>
        </Box>

    );
}

export default DurianDiseases;
