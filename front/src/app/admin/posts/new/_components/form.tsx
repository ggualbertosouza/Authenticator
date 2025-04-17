"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MonacoEditorWrapper = dynamic(() => import("./editoWrapper"), {
  ssr: false,
});

const postSchema = z.object({
  title: z.string().min(3),
  summary: z.string().min(10),
  content: z.string().min(20),
  tags: z.array(z.string().min(1)),
  category: z.string().min(1),
});

type PostFormData = z.infer<typeof postSchema>;

const PostForm = () => {
  const [tagInput, setTagInput] = useState("");
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      tags: [],
      category: "",
    },
  });

  useEffect(() => {
    // Simula fetch de categorias
    setAllCategories(["Tecnologia", "Educação", "Saúde", "Negócios"]);
  }, []);

  const onSubmit = (data: PostFormData) => {
    console.log("Publicar:", data);
  };

  const saveDraft = () => {
    const data = watch();
    console.log("Salvar como rascunho:", data);
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    const currentTags = watch("tags");
    if (currentTags.includes(trimmed)) return;
    setValue("tags", [...currentTags, trimmed]);
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = watch("tags").filter((t) => t !== tag);
    setValue("tags", updatedTags);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      {/* Título */}
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input id="title" placeholder="Título do post" {...register("title")} />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Resumo */}
      <div className="space-y-2">
        <Label htmlFor="summary">Resumo</Label>
        <Textarea
          id="summary"
          placeholder="Resumo do post"
          {...register("summary")}
        />
        {errors.summary && (
          <p className="text-sm text-red-500 mt-1">{errors.summary.message}</p>
        )}
      </div>

      {/* Categoria */}
      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Select onValueChange={(value) => setValue("category", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {allCategories.map((cat, idx) => (
              <SelectItem key={idx} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex gap-2 items-center">
          <Input
            id="tags"
            placeholder="Digite uma tag e pressione Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={handleAddTag}>
            Adicionar
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {watch("tags").map((tag, idx) => (
            <div
              key={idx}
              className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
            >
              <span>{tag}</span>
              <X
                className="ml-2 w-4 h-4 cursor-pointer text-red-500"
                onClick={() => handleRemoveTag(tag)}
              />
            </div>
          ))}
        </div>
        {errors.tags && (
          <p className="text-sm text-red-500 mt-1">{errors.tags.message}</p>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Conteúdo</Label>
        <div className="h-60 md:h-96 border rounded-md overflow-hidden">
          <MonacoEditorWrapper
            value={watch("content")}
            onChange={(val) => setValue("content", val)}
          />
        </div>
        {errors.content && (
          <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
        )}
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-4 flex-wrap">
        <Button type="button" variant="outline" onClick={saveDraft}>
          Salvar rascunho
        </Button>
        <Button type="submit">Publicar</Button>
      </div>
    </form>
  );
};

export default PostForm;
