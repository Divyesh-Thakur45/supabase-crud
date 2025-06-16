import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Create() {
    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <form>
                <Card className="w-[120%] max-w-sm p-5">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="image">image</Label>
                            </div>
                            <Input id="image" type="file" />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="name">name</Label>
                            </div>
                            <Input id="note" type="text" />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="price">price</Label>
                            </div>
                            <Input id="price" type="text" />
                        </div>
                    </div>
                    <Button>Create</Button>
                </Card>
            </form>
        </div>
    )
}