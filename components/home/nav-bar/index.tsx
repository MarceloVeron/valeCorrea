import React, { useEffect, useState } from "react";
import IconNavbar from "./IconNavbar";
import Link from "next/link";
import { useRouter } from "next/router";
import useCategoryStore from "../../utils/useCategoryStore";
import useAdComplete from "../../utils/useAdComplete";
interface props {
  maxWhith?: boolean;
}
interface SubCategoryIds {
  id: number;
  item: string;
}
interface SubCategory {
  id: number;
  category: string;
  sub: SubCategoryIds[];
}
const NavBar: React.FC<props> = ({ maxWhith }) => {
  const { selectedCategory, setSelectedCategory } = useCategoryStore();
  const { adCategoryComplete, setAdCategoryComplete } = useAdComplete();

  const [subCategory, setSetsubCategory] = useState<SubCategory[]>([]);

  const router = useRouter();
  const menuItems = [
    { label: "sobre mi", href: "sobre-mi" },
    { label: "derecho", href: "derecho" },
    { label: "psicologia", href: "psicologia" },
    { label: "organico", href: "bienestar" },
    { label: "filosofía", href: "filosofia" },
    { label: "visual", href: "visual" },
    { label: "inspiración", href: "inspiracion" },
  ];
  useEffect(() => {
    if (
      router.pathname.includes("derecho") &&
      router?.pathname !== "/derecho/[ID]"
    ) {
      setSetsubCategory([
        {
          id: 0,
          category: "derecho",
          sub: [
            { id: 0, item: "salud" },
            { id: 1, item: "penal" },
            { id: 2, item: "otros" },
          ],
        },
      ]);

      const selectedOne = subCategory.filter((e) => {
        return e.sub.filter((i) => {
          return i.item === "salud";
        });
      });

      console.log(selectedOne);

      // setSelectedCategory(subCategory[0][0])
    }
  }, [selectedCategory, router.pathname, router.query.ID]);

  return (
    <div
      className={` flex items-center justify-between  mx-auto  px-[4.3%]  h-[8.2vw] w-full  relative`}
    >
      <IconNavbar />
      <div className="w-full mx-auto">
        <ul className="flex items-end gap-[1vw] mx-auto w-max">
          {menuItems.map((item) => (
            <li key={item.href} className={`w-max relative  `}>
              <Link
                className={` ${
                  router.pathname.replace("/[ID]", "") === `/${item.href}`
                    ? "font-playfairSemiBold text-[1.7vw]  opacity-100  text-black"
                    : "text-black opacity-60 text-[1.3vw]   font-playfair "
                }`}
                href={`/${item.href}`}
              >
                {item.label}
              </Link>
              {subCategory.map(
                (e) =>
                  item.label === e.category && (
                    <div
                      className="absolute left-[50%] translate-x-[-50%] top-[3vw]"
                      key={e.id}
                    >
                      <ul>
                        {e.sub.map((subItem) => (
                          <li
                            className={`text-[1.2vw] ${
                              selectedCategory !== null &&
                              selectedCategory.includes(subItem.item)
                                ? "text-black"
                                : "text-gray-500"
                            }  cursor-pointer font-playfair `}
                            key={subItem.id}
                            onClick={() => setSelectedCategory(subItem.item)}
                          >
                            *{subItem.item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
