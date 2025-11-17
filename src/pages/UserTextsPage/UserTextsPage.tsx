import { Button, Empty, Modal, Spin, Tag, message } from "antd";
import { Eye, Heart } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/user-context.tsx";
import { useUserTexts, type UserTextItem } from "../../hooks/use-user-texts.ts";
import { userTextsService } from "../../services/userTextsService.ts";
import { getUniquenessColor } from "../../utils/get-uniqueness-color.ts";
import {
  CardActions,
  MetaRow,
  PageHeader,
  PageWrapper,
  TextCard,
  TextList,
  TextPreview,
  Title,
} from "./styled";

export const UserTextsPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const {
    data: texts = [],
    isLoading,
    isFetching,
    refetch,
  } = useUserTexts();
  const [selected, setSelected] = useState<UserTextItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [pendingFavoriteId, setPendingFavoriteId] = useState<string | null>(null);

  const isBusy = isLoading || isFetching;

  const openModal = (item: UserTextItem) => {
    setSelected(item);
    setModalOpen(true);
  };

  const handleCopy = async () => {
    if (!selected) return;
    await navigator.clipboard.writeText(selected.text);
    messageApi.success("Скопійовано в буфер");
  };

  const toggleFavorite = async (item: UserTextItem) => {
    if (!user?.uid) return;
    setPendingFavoriteId(item.id);
    try {
      await userTextsService.setFavorite(user.uid, item.id, !item.isFavorite);
      await refetch();
      messageApi.success(item.isFavorite ? "Видалено з обраного" : "Додано в обране");
    } catch (error) {
      console.error(error);
      messageApi.error("Не вдалося оновити");
    } finally {
      setPendingFavoriteId(null);
    }
  };

  const content = useMemo(() => {
    if (!user) {
      return <Empty description="Увійдіть, щоб переглянути історію" />;
    }
    if (isBusy) {
      return (
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
          <Spin size="large" />
        </div>
      );
    }
    if (!texts.length) {
      return <Empty description="Поки що немає перевірених текстів" />;
    }

    return (
      <TextList>
        {texts.map((item) => {
          const checkedDate = item.checkedAt?.toDate().toLocaleString("uk-UA") ?? "Невідомо";
          const preview = item.text.length > 160 ? `${item.text.slice(0, 160)}…` : item.text;

          return (
            <TextCard key={item.id}>
              <TextPreview>{preview || "Порожній текст"}</TextPreview>
              <MetaRow>
                <span>{checkedDate}</span>
                <Tag color={getUniquenessColor(item.uniqueness)}>{item.uniqueness}%</Tag>
              </MetaRow>
              <CardActions>
                <Button size="small" icon={<Eye size={14} />} onClick={() => openModal(item)}>
                  Переглянути
                </Button>
                <Button
                  size="small"
                  icon={<Heart size={14} />}
                  loading={pendingFavoriteId === item.id}
                  onClick={() => toggleFavorite(item)}
                  type={item.isFavorite ? "primary" : "default"}
                >
                  {item.isFavorite ? "В обраному" : "До обраного"}
                </Button>
              </CardActions>
            </TextCard>
          );
        })}
      </TextList>
    );
  }, [isBusy, texts, user, pendingFavoriteId]);

  return (
    <PageWrapper>
      {contextHolder}
      <PageHeader>
        <div>
          <Title>Історія перевірок</Title>
          <p style={{ color: "#6b7280" }}>Усі тексти, які ви перевіряли</p>
        </div>
        <Button onClick={() => navigate("/")}>Назад</Button>
      </PageHeader>
      {content}
      <Modal
        open={modalOpen}
        title="Повний текст"
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="copy" onClick={handleCopy}>
            Копіювати
          </Button>,
          <Button key="close" type="primary" onClick={() => setModalOpen(false)}>
            Закрити
          </Button>,
        ]}
        width={700}
      >
        <p style={{ whiteSpace: "pre-wrap" }}>{selected?.text}</p>
      </Modal>
    </PageWrapper>
  );
};

