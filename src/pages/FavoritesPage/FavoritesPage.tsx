import { Button, Empty, Modal, Spin, Tag, message } from "antd";
import { HeartOff } from "lucide-react";
import { useState } from "react";
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
} from "../UserTextsPage/styled";

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { data: favorites = [], isLoading, isFetching, refetch } = useUserTexts({ onlyFavorites: true });
  const [selected, setSelected] = useState<UserTextItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const isBusy = isLoading || isFetching;

  const handleCopy = async () => {
    if (!selected) return;
    await navigator.clipboard.writeText(selected.text);
    messageApi.success("Скопійовано");
  };

  const removeFavorite = async (item: UserTextItem) => {
    if (!user?.uid) return;
    setPendingId(item.id);
    try {
      await userTextsService.setFavorite(user.uid, item.id, false);
      await refetch();
      messageApi.success("Видалено з обраних");
    } catch (error) {
      console.error(error);
      messageApi.error("Не вдалося оновити");
    } finally {
      setPendingId(null);
    }
  };

  return (
    <PageWrapper>
      {contextHolder}
      <PageHeader>
        <div>
          <Title>Обране</Title>
          <p style={{ color: "#6b7280" }}>Тексти, які ви зберегли вручну</p>
        </div>
        <Button onClick={() => navigate("/")}>Назад</Button>
      </PageHeader>

      {!user ? (
        <Empty description="Увійдіть, щоб бачити обране" />
      ) : isBusy ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
          <Spin size="large" />
        </div>
      ) : favorites.length === 0 ? (
        <Empty description="Ще немає обраних текстів" />
      ) : (
        <TextList>
          {favorites.map((item) => {
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
                  <Button size="small" onClick={() => { setSelected(item); setModalOpen(true); }}>
                    Переглянути
                  </Button>
                  <Button
                    size="small"
                    danger
                    icon={<HeartOff size={14} />}
                    loading={pendingId === item.id}
                    onClick={() => removeFavorite(item)}
                  >
                    Видалити
                  </Button>
                </CardActions>
              </TextCard>
            );
          })}
        </TextList>
      )}

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

