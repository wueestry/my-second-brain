import os
import shutil
import re
import glob


home_dir = os.getenv("HOME")
private_obsidian_path = f"{home_dir}/Documents/obsidian"

file_dir_path = os.path.abspath(__file__)
quartz_content_path = f"{home_dir}/Developer/quartz/content"

regexp_md_images = "!\[\[(.*?)\]\]"


def find_publish_tag(private_obsidian_path: str, quartz_path: str) -> None:
    for root, dirs, files in os.walk(private_obsidian_path):
        for file in files:
            file_path = os.path.join(root, file)
            if not file.endswith(".md"):
                continue
            with open(file_path, "r") as f:
                for line in f:
                    if "#publish" in line:
                        # destination should be lower-case (spaces will be handled by hugo with `urlize`)
                        file_name_lower = os.path.basename(file_path).lower()

                        # print(f"publish: {file_path}, ln: {line_number}")
                        # copy that file to the publish notes directory
                        shutil.copy(
                            file_path, os.path.join(quartz_path, file_name_lower)
                        )
                        break


def find_and_copy_image(image_name: str, root_path: str, quartz_path: str) -> None:
    text_files = glob.glob(root_path + "/**/" + image_name, recursive=True)
    for file in text_files:
        shutil.copy(file, quartz_path)


def list_images_from_markdown(
    file_path: str, private_obsidian_path: str, quartz_path: str
) -> None:
    # search for images in markdown file
    file_content = open(file_path, "r").read()
    images = re.findall(regexp_md_images, file_content)
    if images:
        # print(f"-found images in {file_path}")
        for image in images:
            image_name = image.split("|")[0]
            if image_name:
                find_and_copy_image(image_name, private_obsidian_path, quartz_path)
    pass


if __name__ == "__main__":
    find_publish_tag(
        private_obsidian_path=private_obsidian_path, quartz_path=quartz_content_path
    )

    for root, dirs, files in os.walk(quartz_content_path):
        for file in files:
            if file.endswith(".md"):
                file_path = os.path.join(root, file)
                list_images_from_markdown(
                    file_path=file_path,
                    private_obsidian_path=private_obsidian_path,
                    quartz_path=quartz_content_path,
                )
